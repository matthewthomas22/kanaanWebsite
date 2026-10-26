const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8' };
const publicFiles = new Set(['/index.html']);

http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  if (pathname.includes('\\') || pathname.includes('\0')) {
    response.writeHead(400).end('Bad request'); return;
  }
  if (pathname === '/') pathname = '/index.html';
  const segments = pathname.split('/');
  const isAsset = pathname.startsWith('/assets/') && segments.every(segment => segment !== '..' && !segment.startsWith('.'));
  if ((!publicFiles.has(pathname) && !isAsset) || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(404).end('Not found'); return;
  }
  const file = path.join(__dirname, pathname);
  fs.readFile(file, (error, bytes) => {
    if (error) { response.writeHead(404).end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  });
}).listen(4173, '127.0.0.1', () => console.log('GKIm Kanaan: http://localhost:4173'));
