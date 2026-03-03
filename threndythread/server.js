const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let relativePath = urlPath;

  if (relativePath === '/' || !relativePath) {
    relativePath = '/index.html';
  }

  const normalizedPath = path.normalize(relativePath).replace(/^\/+/, '');
  let resolvedPath = path.join(ROOT, normalizedPath);
  resolvedPath = path.resolve(resolvedPath);

  if (!resolvedPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    let stats = await fs.promises.stat(resolvedPath);

    if (stats.isDirectory()) {
      resolvedPath = path.join(resolvedPath, 'index.html');
      resolvedPath = path.resolve(resolvedPath);
      stats = await fs.promises.stat(resolvedPath);
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(resolvedPath).pipe(res);
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : 500;
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end(status === 404 ? 'Not Found' : 'Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Static server ready: http://localhost:${PORT}`);
});
