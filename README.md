# Chevauxenbois

Personal portfolio, blog, project index, and French notes for Harsh
Kahate.

The site is intentionally static and free to host on GitHub Pages. Articles are
Markdown files under `content/writing/`, with images stored under
`public/images/`.

## Local Preview

```bash
npm run build
npm run serve
```

Open `http://127.0.0.1:8788`.

## Maintenance

This site is not tied to Codex. It is a static site generated from Markdown and
can be maintained with any editor. See [docs/MAINTENANCE.md](docs/MAINTENANCE.md)
for the full update, preview, Medium import, and GitHub Pages publishing guide.

## Writing With Images

```md
---
title: "Article title"
date: "2026-06-16"
summary: "Short description"
tags: ["Privacy", "DPDPA"]
cover: "/images/articles/example.svg"
---

Intro paragraph.

![Screenshot caption](/images/articles/example.svg)
```

## Medium Migration

Run:

```bash
npm run import:medium -- /path/to/medium-export.zip
npm run build
```

The importer converts real Medium posts into `content/writing/`, preserves
canonical links, and skips drafts or tiny reply posts.
