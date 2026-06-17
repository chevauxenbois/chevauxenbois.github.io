import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const port = Number(process.env.PORT || 8788);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url || "/").split("?")[0];
  let filePath = join(dist, url);
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, "index.html");
  } catch {
    filePath = join(dist, url, "index.html");
  }
  try {
    const body = await readFile(filePath);
    res.writeHead(200, { "content-type": types[extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview: http://127.0.0.1:${port}`);
});
