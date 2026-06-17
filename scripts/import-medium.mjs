import { execFile } from "node:child_process";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = new URL("..", import.meta.url).pathname;
const outputDir = join(root, "content", "writing");
const marker = "imported_from_medium: true";
const legacyMarker = "<!-- imported-from-medium -->";

const defaultArchive =
  "/Users/hkahate/Downloads/medium-export-797c8de5a64ae3c4373767d8619a59b52379cd695d1028d220036e3d8b1fc601.zip";
const archive = process.argv[2] || defaultArchive;

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120)
    .replace(/-$/g, "");
}

function decodeEntities(input = "") {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&#([0-9]+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/[ ​]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
}

function stripTags(input = "") {
  return decodeEntities(input.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdown(input = "") {
  return input
    .replace(/^#+\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function frontmatterString(value = "") {
  return JSON.stringify(String(value));
}

function extractFirst(regex, html) {
  const match = html.match(regex);
  return match ? decodeEntities(stripTags(match[1] || match[0])) : "";
}

function extractBody(html) {
  const match = html.match(/<section[^>]+data-field=["']body["'][^>]*>([\s\S]*?)<\/section>\s*<footer/i);
  return match ? match[1] : html;
}

function convertInline(html = "") {
  let out = html;
  out = out.replace(/<br\s*\/?>/gi, "\n");
  out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  out = out.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  out = out.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  out = out.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");
  out = out.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs, text) => {
    const href = attr(attrs, "href");
    const label = stripTags(text);
    if (!href || !label) return label;
    return `[${label}](${href})`;
  });
  return stripTags(out).replace(/\s+\n/g, "\n").trim();
}

function convertPre(match) {
  const code = decodeEntities(
    match
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/div>|<\/p>|<\/span>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return code ? `\n\n\`\`\`\n${code}\n\`\`\`\n\n` : "\n\n";
}

function htmlToMarkdown(html) {
  let body = extractBody(html);

  body = body.replace(/<pre\b[\s\S]*?<\/pre>/gi, convertPre);
  body = body.replace(/<figure\b[\s\S]*?<\/figure>/gi, (figure) => {
    const imageTag = figure.match(/<img\b[^>]*>/i)?.[0] || "";
    const src = attr(imageTag, "src");
    const caption = extractFirst(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i, figure);
    if (!src) return "\n\n";
    return `\n\n![${caption || "Article image"}](${src})\n\n`;
  });
  body = body.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_, text) => `\n\n# ${convertInline(text)}\n\n`);
  body = body.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n\n## ${convertInline(text)}\n\n`);
  body = body.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n\n## ${convertInline(text)}\n\n`);
  body = body.replace(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi, (_, text) => `\n\n### ${convertInline(text)}\n\n`);
  body = body.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => `\n- ${convertInline(text)}`);
  body = body.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => {
    const converted = convertInline(text);
    return converted ? `\n\n${converted}\n\n` : "\n\n";
  });
  body = body.replace(/<hr\b[^>]*>/gi, "\n\n---\n\n");
  body = body.replace(/<\/?(section|div|ul|ol)[^>]*>/gi, "\n");
  body = decodeEntities(body.replace(/<[^>]+>/g, ""));

  return decodeEntities(body)
    .split(/\n/)
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s*---\n+/, "")
    .replace(/^# .+\n\n/, "")
    .trim();
}

function dropDuplicateOpeningTitle(markdown, title) {
  const lines = markdown.split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim());
  if (firstContentIndex === -1) return markdown;
  const first = lines[firstContentIndex].trim();
  if (!/^#{1,4}\s+/.test(first)) return markdown;
  if (slugify(stripMarkdown(first)) !== slugify(title)) return markdown;
  lines.splice(firstContentIndex, 1);
  return lines.join("\n").replace(/^\n+/, "").trim();
}

function removeFirstImage(markdown, src) {
  const lines = markdown.split("\n");
  let removed = false;
  const filtered = lines.filter((line) => {
    if (!removed && line.trim().startsWith("![") && line.includes(`](${src})`)) {
      removed = true;
      return false;
    }
    return true;
  });
  return filtered.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function inferTags({ title, summary, body }) {
  const text = `${title} ${summary} ${body}`.toLowerCase();
  const tags = [];
  if (/\b(llm|ai|model|rag|prompt|owasp llm|poisoning|stochastic)\b/.test(text)) tags.push("AI Security");
  if (/\b(grc|soc 2|audit|rbi|compliance|risk|governance)\b/.test(text)) tags.push("GRC");
  if (/\b(privacy|pii|dpdpa|gdpr|data protection|consent)\b/.test(text)) tags.push("Privacy");
  if (/\b(aws|cloud|kubernetes|kube|iam|security hub|docker)\b/.test(text)) tags.push("Cloud Security");
  if (/\b(cvss|owasp|zero trust|wazuh|vulnhub|linux|android|steganography|security)\b/.test(text)) tags.push("Security");
  return [...new Set(tags)].slice(0, 4);
}

function wordCount(markdown) {
  return (markdown.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) || []).length;
}

async function convertPost(filePath) {
  const fileName = basename(filePath);
  if (fileName.startsWith("draft_") || !/^\d{4}-\d{2}-\d{2}_/.test(fileName)) return { skipped: fileName, reason: "draft-or-undated" };

  const html = await readFile(filePath, "utf8");
  const title = extractFirst(/<h1[^>]+class=["'][^"']*p-name[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i, html) || extractFirst(/<title>([\s\S]*?)<\/title>/i, html);
  const summary = extractFirst(/<section[^>]+data-field=["']subtitle["'][^>]*>([\s\S]*?)<\/section>/i, html);
  const published = html.match(/<time[^>]+datetime=["']([^"']+)["']/i)?.[1]?.slice(0, 10) || fileName.slice(0, 10);
  const canonicalTag = html.match(/<a\b[^>]*class=["'][^"']*p-canonical[^"']*["'][^>]*>/i)?.[0] || "";
  const canonical = attr(canonicalTag, "href");
  let markdown = htmlToMarkdown(html);
  markdown = dropDuplicateOpeningTitle(markdown, title);
  const words = wordCount(markdown);

  if (words < 250) return { skipped: fileName, reason: `short-post-${words}-words` };

  const firstImage = extractBody(html).match(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/i)?.[1] || "";
  if (firstImage) markdown = removeFirstImage(markdown, firstImage);
  const slug = `${published}-${slugify(title)}`;
  const tags = inferTags({ title, summary, body: markdown });
  const frontmatter = [
    "---",
    `title: ${frontmatterString(title)}`,
    `date: ${frontmatterString(published)}`,
    `summary: ${frontmatterString(summary || markdown.split(/\n\n/)[0]?.slice(0, 180) || "")}`,
    `tags: [${tags.map(frontmatterString).join(", ")}]`,
    firstImage ? `cover: ${frontmatterString(firstImage)}` : "",
    canonical ? `canonical: ${frontmatterString(canonical)}` : "",
    "source: \"Medium\"",
    marker,
    "---",
    "",
    markdown,
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const outFile = join(outputDir, `${slug}.md`);
  await writeFile(outFile, frontmatter, "utf8");
  return { imported: fileName, outFile: basename(outFile), words };
}

async function main() {
  const tempRoot = await mkdtemp(join(tmpdir(), "medium-export-"));
  try {
    const existing = (await readdir(outputDir)).filter((file) => file.endsWith(".md"));
    let removed = 0;
    for (const file of existing) {
      const path = join(outputDir, file);
      const contents = await readFile(path, "utf8");
      if (contents.includes(marker) || contents.includes(legacyMarker)) {
        await rm(path);
        removed += 1;
      }
    }
    await execFileAsync("unzip", ["-q", "-o", archive, "-d", tempRoot], { maxBuffer: 1024 * 1024 * 10 });
    const postsDir = join(tempRoot, "posts");
    const posts = (await readdir(postsDir)).filter((file) => file.endsWith(".html")).sort();
    const results = [];
    for (const post of posts) {
      results.push(await convertPost(join(postsDir, post)));
    }
    const imported = results.filter((item) => item.imported);
    const skipped = results.filter((item) => item.skipped);
    if (removed) console.log(`Removed ${removed} previously imported Medium articles.`);
    console.log(`Imported ${imported.length} Medium articles into content/writing.`);
    for (const item of imported) console.log(`+ ${item.outFile} (${item.words} words)`);
    console.log(`Skipped ${skipped.length} archive items.`);
    for (const item of skipped) console.log(`- ${item.skipped}: ${item.reason}`);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

await main();
