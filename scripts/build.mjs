import { mkdir, readFile, readdir, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const site = {
  title: "Chevauxenbois",
  description: "Harsh Kahate on information security, GRC engineering, AI security and governance, data privacy, open source, writing, and languages.",
  url: "https://chevauxenbois.com",
  github: "https://github.com/chevauxenbois",
  linkedin: "https://linkedin.com/in/hkahate",
  svikruti: "https://chevauxenbois.github.io/svikruti/",
};

const nav = [
  ["Blog", "/writing/"],
  ["Projects", "/projects/"],
  ["Languages", "/french/"],
  ["About", "/about/"],
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFrontmatter(source) {
  if (!source.startsWith("---")) return [{}, source];
  const end = source.indexOf("\n---", 3);
  if (end === -1) return [{}, source];
  const raw = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();
  const data = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    data[key] = parseValue(value.trim());
  }
  return [data, body];
}

function parseValue(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return value.replace(/^["']|["']$/g, "");
}

function escapeHtml(input = "") {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(input = "") {
  let out = escapeHtml(input);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let codeLang = "";
  let inCode = false;
  let quote = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${quote.map((item) => `<p>${inlineMarkdown(item)}</p>`).join("")}</blockquote>`);
    quote = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (!inCode) {
        flushParagraph();
        flushList();
        flushQuote();
        inCode = true;
        codeLang = line.slice(3).trim();
        code = [];
      } else {
        html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(code.join("\n"))}</code></pre>`);
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = heading[1].length + 1;
      const text = heading[2].trim();
      html.push(`<h${level} id="${slugify(text)}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push(`<figure><img src="${image[2]}" alt="${escapeHtml(image[1])}" loading="lazy"><figcaption>${escapeHtml(image[1])}</figcaption></figure>`);
      continue;
    }
    if (/^-{3,}$/.test(line.trim())) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push("<hr>");
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      flushQuote();
      list.push(bullet[1]);
      continue;
    }
    const quoted = line.match(/^>\s?(.+)$/);
    if (quoted) {
      flushParagraph();
      flushList();
      quote.push(quoted[1]);
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  flushQuote();
  return html.join("\n");
}

async function loadCollection(name) {
  const dir = join(root, "content", name);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".md"));
  const items = [];
  for (const file of files) {
    const source = await readFile(join(dir, file), "utf8");
    const [data, body] = parseFrontmatter(source);
    const slug = data.slug || file.replace(/\.md$/, "");
    items.push({
      ...data,
      slug,
      body,
      html: markdownToHtml(body),
      collection: name,
      url: `/${name}/${slug}/`,
      tags: data.tags || [],
    });
  }
  return items.sort((a, b) => {
    if (a.rank || b.rank) {
      return Number(a.rank || 999) - Number(b.rank || 999);
    }
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
}

function layout({ title, description, body, pageClass = "", ogImage = "/images/brand/atelier-map.svg" }) {
  const fullTitle = title === site.title ? title : `${title} | ${site.title}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description || site.description)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description || site.description)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <link rel="stylesheet" href="/assets/styles.css?v=20260617">
  <link rel="alternate" type="application/rss+xml" title="Chevauxenbois writing" href="/rss.xml">
</head>
<body class="${pageClass}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Chevauxenbois home">
      <span class="brand-mark">cb</span>
      <span><strong>chevauxenbois</strong><small>Harsh Kahate</small></span>
    </a>
    <nav class="site-nav" aria-label="Main navigation">
      ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
    </nav>
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="site-footer">
    <div>
      <strong>Chevauxenbois</strong>
      <p>Information security, GRC engineering, AI governance, privacy, writing, open source, and languages.</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="${site.github}">GitHub</a>
      <a href="${site.linkedin}">LinkedIn</a>
      <a href="${site.svikruti}">Svikruti</a>
      <a href="/writing/">Blog</a>
    </nav>
  </footer>
</body>
</html>`;
}

function card(item, type = "writing") {
  const tags = (item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const isProject = type === "project" || type === "projects";
  return `<article class="content-card ${isProject ? "project-card" : ""}">
    <a href="${item.url}" aria-label="${escapeHtml(item.title)}">
      ${item.cover ? `<img src="${item.cover}" alt="" loading="lazy">` : ""}
      <div>
        <p class="kicker">${escapeHtml(item.date || type)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary || "")}</p>
        <div class="tag-row">${tags}</div>
      </div>
    </a>
  </article>`;
}

function pageHero({ eyebrow, title, copy, actions = "" }) {
  return `<section class="page-hero">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h1>${title}</h1>
    <p>${copy}</p>
    ${actions ? `<div class="hero-actions">${actions}</div>` : ""}
  </section>`;
}

function homePage({ writing, projects, french }) {
  return layout({
    title: site.title,
    description: site.description,
    pageClass: "home-page",
    body: `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Information Security · GRC Engineering · AI Security & Governance · Privacy · Open Source · Languages</p>
          <h1>Information security, GRC, AI security & governance, privacy, open source, and languages.</h1>
          <p class="lead">I am Harsh Kahate. I work in Information Security, GRC engineering, AI security and governance, and data privacy. I build and write about practical security products, DPDPA, privacy engineering, and open-source tooling. As a passion, I teach French at Alliance Française and study languages.</p>
          <div class="hero-actions">
            <a class="button" href="/writing/">Read the blog</a>
            <a class="button secondary" href="/projects/">See projects</a>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <img src="/images/brand/atelier-map.svg" alt="">
        </div>
      </section>

      <section class="signal-strip" aria-label="Focus areas">
        <div><strong>InfoSec and GRC Engineering</strong><span>Security programs, control design, risk workflows, audit readiness, and engineering-led governance.</span></div>
        <div><strong>Data Privacy and AI Governance</strong><span>DPDPA readiness, privacy engineering, consent, data evidence, AI risk, and responsible adoption.</span></div>
        <div><strong>Writing</strong><span>Blog posts and field notes on security, privacy, open source, product craft, and building in public.</span></div>
        <div><strong>Languages</strong><span>French learning and teaching notes, language systems, memory, and cultural study.</span></div>
      </section>

      <section class="feature-grid">
        <div class="feature-panel large">
          <p class="eyebrow">Current flagship</p>
          <h2>Svikruti</h2>
          <p>India-first open-source PrivacyOps evidence workbench for DPDPA readiness. Code, websites, notices, consent journeys, RoPA, vendors, and fix packs.</p>
          <a href="${site.svikruti}">Open Svikruti</a>
        </div>
        <div class="feature-panel">
          <p class="eyebrow">Blog</p>
          <h2>Blog posts with receipts.</h2>
          <p>Long-form writing on information security, GRC, AI governance, privacy, open source, and languages.</p>
          <a href="/writing/">Browse the blog</a>
        </div>
        <div class="feature-panel">
          <p class="eyebrow">Languages</p>
          <h2>Language Notes.</h2>
          <p>A public notebook for French teaching, language study, memory, culture, and practical learning systems.</p>
          <a href="/french/">Open language notes</a>
        </div>
      </section>

      <section class="section-head">
        <p class="eyebrow">Latest from the blog</p>
        <h2>Notes, posts, and build logs.</h2>
      </section>
      <div class="card-grid">${writing.slice(0, 3).map((item) => card(item)).join("")}</div>

      <section class="section-head">
        <p class="eyebrow">Projects</p>
        <h2>Public workbench.</h2>
      </section>
      <div class="project-row">${projects.slice(0, 3).map((item) => card(item, "project")).join("")}</div>
    `,
  });
}

function listingPage({ title, eyebrow, copy, items, collection }) {
  const actions =
    collection === "writing"
      ? '<a class="button" href="/rss.xml">Subscribe via RSS</a>'
      : "";
  const meta =
    collection === "writing"
      ? `<div><strong>${items.length} posts</strong><span>Security, GRC, AI governance, privacy, cloud, and practical engineering notes.</span></div><a href="/rss.xml">RSS feed</a>`
      : `<div><strong>${items.length} projects</strong><span>Open-source tools, automation experiments, teaching utilities, and public work.</span></div>`;
  return layout({
    title,
    description: copy,
    body: `
      ${pageHero({ eyebrow, title, copy, actions })}
      <section class="blog-tools">
        ${meta}
      </section>
      <div class="card-grid blog-grid">${items.map((item) => card(item, collection)).join("")}</div>
    `,
  });
}

function svikrutiProjectPage(item) {
  const quickstart = `git clone https://github.com/chevauxenbois/svikruti
cd svikruti
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
svikruti scan --repo examples/realistic --save-history
svikruti dashboard`;

  const outputs = [
    ["Local dashboard", "A review cockpit for risk, control posture, breach readiness, evidence search, and AI-ready summaries."],
    ["HTML evidence pack", "A portable report for privacy, security, legal, product, and engineering review without uploading code."],
    ["SARIF", "GitHub code scanning output so privacy and security findings can show up in pull-request workflows."],
    ["RoPA CSV", "A starter processing inventory with data categories, purposes, owners, systems, vendors, and evidence references."],
    ["Vendor CSV", "Third-party and processor register starter with DPA, transfer, safeguards, review, and ownership fields."],
    ["Fix pack", "Copy-ready issue bodies for GitHub, Jira, or Linear with priority, owner hints, acceptance criteria, and evidence links."],
  ];

  const features = [
    ["Code-aware discovery", "Scans source code, web surfaces, OpenAPI/schema files, Kubernetes/IaC signals, notices, and consent traces to find privacy-relevant evidence."],
    ["Technical controls", "Connects DPDPA readiness to encryption, secret hygiene, logging risk, vulnerability management, monitoring, backup, and incident response evidence."],
    ["AI-native evidence", "Produces structured evidence packets that an AI reviewer can summarize without inventing facts outside the scanner results."],
    ["Local-first posture", "Runs on your machine by default. Teams can inspect results without sending repositories or sensitive evidence to a hosted scanner."],
  ];

  return layout({
    title: item.title,
    description: item.summary,
    ogImage: "/images/projects/svikruti-dashboard-command-center.png",
    pageClass: "svikruti-product-page",
    body: `
      <section class="svk-hero">
        <div class="svk-hero-copy">
          <p class="svk-eyebrow">Open source privacy engineering for India</p>
          <h1>Svikruti turns DPDPA readiness into engineering evidence.</h1>
          <p class="svk-lead">A local-first PrivacyOps workbench that scans code, websites, notices, cloud and security signals, vendors, and consent surfaces, then turns them into actions teams can review before a release.</p>
          <div class="svk-actions">
            <a class="button" href="https://github.com/chevauxenbois/svikruti">View GitHub</a>
            <a class="button secondary" href="#quickstart">Run locally</a>
            <a class="button secondary" href="${site.svikruti}">Open launch site</a>
          </div>
          <div class="svk-proof-strip" aria-label="Svikruti positioning">
            <span>DPDPA</span>
            <span>PrivacyOps</span>
            <span>SARIF</span>
            <span>RoPA</span>
            <span>AI-ready evidence</span>
          </div>
        </div>
        <div class="svk-product-shot" aria-label="Svikruti dashboard preview">
          <div class="svk-window-bar"><span></span><span></span><span></span><strong>svikruti dashboard</strong></div>
          <img src="/images/projects/svikruti-dashboard-command-center.png" alt="Svikruti command center dashboard showing DPDPA risk, breach readiness, controls, parser coverage, and evidence counts.">
        </div>
      </section>

      <section class="svk-metrics" aria-label="Project highlights">
        <div><strong>Local-first</strong><span>No hosted upload required for the open-source workflow.</span></div>
        <div><strong>Multi-signal</strong><span>Code, web, notices, controls, vendors, breach readiness.</span></div>
        <div><strong>Review-ready</strong><span>Dashboard, HTML, JSON, SARIF, CSV, Markdown fix packs.</span></div>
        <div><strong>AI-native</strong><span>Optional synthesis grounded in scanner evidence.</span></div>
      </section>

      <section class="svk-section svk-split">
        <div>
          <p class="svk-eyebrow">Why it exists</p>
          <h2>DPDPA compliance should not stop at policies and screenshots.</h2>
          <p>Most compliance work becomes a tracker of manual statements: policy exists, screenshot attached, owner says done. Svikruti takes a different approach. It starts from the systems that actually process data, then creates a trace from source evidence to privacy obligation, control posture, and remediation.</p>
          <p>The goal is not to replace legal review. The goal is to give privacy, security, product, and engineering teams a shared evidence layer they can inspect, challenge, and improve.</p>
        </div>
        <div class="svk-feature-stack">
          ${features.map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join("")}
        </div>
      </section>

      <section class="svk-section">
        <div class="svk-section-head">
          <p class="svk-eyebrow">Workflow</p>
          <h2>One scan, many review surfaces.</h2>
        </div>
        <div class="svk-flow" aria-label="Svikruti workflow">
          <div><span>01</span><strong>Scan</strong><p>Repository, website, notice, consent path, schema, cloud and security evidence.</p></div>
          <div><span>02</span><strong>Map</strong><p>Connect personal-data categories to source files, systems, vendors, and notice coverage.</p></div>
          <div><span>03</span><strong>Control</strong><p>Score technical controls such as encryption, monitoring, secrets, vulnerability management, and incident readiness.</p></div>
          <div><span>04</span><strong>Gate</strong><p>Convert high-risk evidence into release decisions, owners, priorities, and acceptance criteria.</p></div>
          <div><span>05</span><strong>Export</strong><p>Generate artifacts for humans, CI, GRC workflows, procurement, legal review, and AI synthesis.</p></div>
        </div>
      </section>

      <section class="svk-section svk-showcase">
        <div>
          <p class="svk-eyebrow">Product surface</p>
          <h2>A dashboard for privacy programs that need engineering proof.</h2>
          <p>Use the local dashboard during release review, audit preparation, vendor checks, or breach readiness conversations. It is designed to show what was found, what is weak, what needs an owner, and which artifacts can be exported.</p>
        </div>
        <div class="svk-shot-grid">
          <figure>
            <img src="/images/projects/svikruti-control-plane-technical.png" alt="Svikruti technical control plane dashboard.">
            <figcaption>Technical control plane</figcaption>
          </figure>
          <figure>
            <img src="/images/projects/svikruti-control-plane-breach.png" alt="Svikruti breach readiness dashboard.">
            <figcaption>Breach readiness posture</figcaption>
          </figure>
        </div>
      </section>

      <section class="svk-section svk-output-section">
        <div class="svk-section-head">
          <p class="svk-eyebrow">Launch artifact pack</p>
          <h2>Outputs that match how teams actually work.</h2>
        </div>
        <div class="svk-output-grid">
          ${outputs.map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join("")}
        </div>
      </section>

      <section id="quickstart" class="svk-section svk-terminal-band">
        <div>
          <p class="svk-eyebrow">Quickstart</p>
          <h2>Run it locally, inspect the evidence, then decide what to fix.</h2>
          <p>Start with the realistic example pack, then point the scanner at your own repository. The open-source flow keeps the scan local and generates review artifacts you can share intentionally.</p>
        </div>
        <pre><code>${escapeHtml(quickstart)}</code></pre>
      </section>

      <section class="svk-section svk-roadmap">
        <div>
          <p class="svk-eyebrow">Open source now</p>
          <h2>Built for builders, privacy teams, and reviewers.</h2>
          <p>The community version is meant to stay useful on its own: local scans, dashboard, evidence packs, export formats, and CI-friendly outputs.</p>
        </div>
        <div>
          <p class="svk-eyebrow">Enterprise direction</p>
          <h2>Continuous PrivacyOps across products and releases.</h2>
          <p>Hosted evidence vault, scan history, org dashboards, SSO/RBAC, approvals, Jira/Linear/GRC integrations, and domain packs for BFSI, healthcare, ecommerce, SaaS, and fintech teams.</p>
        </div>
      </section>

      <section class="svk-cta">
        <div>
          <p class="svk-eyebrow">Build in public</p>
          <h2>Use it, star it, break it, improve it.</h2>
          <p>Svikruti is my attempt to make DPDPA readiness more practical for India's privacy community: less theatre, more evidence, more open-source tooling.</p>
        </div>
        <div class="svk-actions">
          <a class="button" href="https://github.com/chevauxenbois/svikruti">Star on GitHub</a>
          <a class="button secondary" href="https://forms.gle/TaBLyFdXdmP1XMek8">Talk about DPDPA journey</a>
        </div>
      </section>
    `,
  });
}

function articlePage(item) {
  if (item.collection === "projects" && item.slug === "svikruti") {
    return svikrutiProjectPage(item);
  }

  const canonical = item.canonical ? `<a href="${item.canonical}">Original / canonical</a>` : "";
  return layout({
    title: item.title,
    description: item.summary,
    ogImage: item.cover || "/images/brand/atelier-map.svg",
    pageClass: "article-page",
    body: `
      <article class="article-shell">
        <header class="article-header">
          <p class="eyebrow">${escapeHtml(item.collection)} · ${escapeHtml(item.date || "undated")}</p>
          <h1>${escapeHtml(item.title)}</h1>
          <p>${escapeHtml(item.summary || "")}</p>
          <div class="tag-row">${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}${canonical}</div>
          ${item.cover ? `<img class="article-cover" src="${item.cover}" alt="">` : ""}
        </header>
        <div class="article-content">${item.html}</div>
      </article>
    `,
  });
}

function aboutPage() {
  return layout({
    title: "About",
    description: "About Harsh Kahate and Chevauxenbois.",
    pageClass: "about-page",
    body: `
      ${pageHero({
        eyebrow: "About",
        title: "Practical security, governance, privacy, and language work.",
        copy: "I am Harsh Kahate. I work in Information Security, GRC engineering, AI security and governance, and data privacy. This is my owned home for writing, open-source tools, security experiments, DPDPA work, and language notes.",
      })}
      <section class="about-profile">
        <div class="about-intro">
          <p class="eyebrow">What I do</p>
          <h2>I turn messy security, privacy, and governance problems into systems people can actually use.</h2>
          <p>I build and write about practical security products, DPDPA readiness, privacy engineering, AI governance, GRC workflows, open-source tooling, and the operational details that make controls real.</p>
          <p>My work sits between product, engineering, risk, audit, and legal: translating requirements into evidence, controls, workflows, and decisions that survive real review.</p>
          <p>Outside the professional lane, I teach French at Alliance Française and study languages as a long-term discipline.</p>
        </div>
        <aside class="about-facts" aria-label="Focus areas">
          <div><span>Core domains</span><strong>Information Security, GRC, Privacy, AI Governance</strong></div>
          <div><span>Public work</span><strong>Svikruti, security digests, teaching tools, automation projects</strong></div>
          <div><span>Writing</span><strong>Security, cloud, OWASP, CVSS, privacy, GRC, AI risk</strong></div>
          <div><span>Language</span><strong>French teaching, language notes, memory systems</strong></div>
        </aside>
      </section>
      <section class="about-grid">
        <div class="about-card">
          <p class="eyebrow">Security and GRC</p>
          <h2>Evidence over theatre.</h2>
          <p>I care about controls that can be inspected: source files, owners, tickets, logs, vendor records, risk decisions, and artifacts that engineers and auditors can both understand.</p>
        </div>
        <div class="about-card">
          <p class="eyebrow">Privacy and AI</p>
          <h2>Governance needs engineering.</h2>
          <p>DPDPA, privacy operations, consent, AI risk, and data governance become useful only when they connect to product surfaces, code paths, cloud systems, and release workflows.</p>
        </div>
        <div class="about-card">
          <p class="eyebrow">Open source</p>
          <h2>Build in public, with proof.</h2>
          <p>Projects like Svikruti are my way of exploring India-first privacy tooling, practical automation, and transparent systems that others can inspect, fork, and improve.</p>
        </div>
        <div class="about-card">
          <p class="eyebrow">Writing</p>
          <h2>Field notes, not fluff.</h2>
          <p>The blog collects security explainers, GRC engineering notes, AI security writing, cloud security posts, and migration of my older Medium work into a home I control.</p>
        </div>
        <div class="about-card">
          <p class="eyebrow">Languages</p>
          <h2>French as craft.</h2>
          <p>Teaching and studying French gives me a second discipline: structure, memory, nuance, repetition, and the patience to keep improving without shortcuts.</p>
        </div>
        <div class="about-card">
          <p class="eyebrow">Why Chevauxenbois</p>
          <h2>An owned place.</h2>
          <p>Platforms are useful for distribution, but this site is the permanent base: projects, blog posts, language notes, experiments, and a public record of what I am building.</p>
        </div>
      </section>
    `,
  });
}

function rss(items) {
  const entries = items
    .slice(0, 20)
    .map((item) => `<item><title>${escapeHtml(item.title)}</title><link>${site.url}${item.url}</link><description>${escapeHtml(item.summary || "")}</description><pubDate>${new Date(item.date || Date.now()).toUTCString()}</pubDate></item>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.title}</title><link>${site.url}</link><description>${site.description}</description>${entries}</channel></rss>`;
}

async function writePage(path, html) {
  const out = join(dist, path, "index.html");
  await mkdir(join(dist, path), { recursive: true });
  await writeFile(out, html, "utf8");
}

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from)) {
    const src = join(from, entry);
    const dst = join(to, entry);
    const info = await stat(src);
    if (info.isDirectory()) {
      await copyDir(src, dst);
    } else {
      await copyFile(src, dst);
    }
  }
}

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await copyDir(join(root, "public"), dist);
  await mkdir(join(dist, "assets"), { recursive: true });
  await copyFile(join(root, "src", "styles.css"), join(dist, "assets", "styles.css"));

  const writing = await loadCollection("writing");
  const projects = await loadCollection("projects");
  const french = await loadCollection("french");

  await writePage("", homePage({ writing, projects, french }));
  await writePage("writing", listingPage({ title: "Blog", eyebrow: "Writing", copy: "Blog posts, build logs, Medium migrations, and field notes across security, GRC, AI governance, privacy, open source, and languages.", items: writing, collection: "writing" }));
  await writePage("projects", listingPage({ title: "Projects", eyebrow: "Workbench", copy: "Open-source tools, product experiments, and systems that deserve a public record.", items: projects, collection: "projects" }));
  await writePage("french", listingPage({ title: "Language Notes", eyebrow: "Languages", copy: "Notes on teaching French, studying languages, memory, culture, and small experiments.", items: french, collection: "french" }));
  await writePage("about", aboutPage());

  for (const item of [...writing, ...projects, ...french]) {
    await writePage(`${item.collection}/${item.slug}`, articlePage(item));
  }

  await writeFile(join(dist, "rss.xml"), rss(writing), "utf8");
  await writeFile(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["", "writing", "projects", "french", "about", ...[...writing, ...projects, ...french].map((item) => item.url.replace(/^\/|\/$/g, ""))].map((path) => `<url><loc>${site.url}/${path}</loc></url>`).join("")}</urlset>`,
    "utf8",
  );
}

await build();
console.log("Built Chevauxenbois site.");

if (process.argv.includes("--watch")) {
  createServer(async (req, res) => {
    const requestPath = decodeURIComponent(req.url || "/").split("?")[0];
    const filePath = requestPath.endsWith("/") ? join(dist, requestPath, "index.html") : join(dist, requestPath);
    try {
      const body = await readFile(filePath);
      const type = extname(filePath) === ".css" ? "text/css" : extname(filePath) === ".svg" ? "image/svg+xml" : "text/html";
      res.writeHead(200, { "content-type": type });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }).listen(8788, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:8788"));
}
