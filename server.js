const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'https://www.tiktok.com',
  changeOrigin: true,
  autoRewrite: true,
  followRedirects: true,
  // This helps TikTok trust the connection
  cookieDomainRewrite: "" 
});

const server = http.createServer((req, res) => {
  // This makes the request look like it's coming from a standard computer
  req.headers['host'] = 'www.tiktok.com';
  req.headers['referrer'] = 'https://www.tiktok.com/';
  
  proxy.web(req, res);
});

// Ignore errors so the server doesn't crash if TikTok blocks a single request
proxy.on('error', function (err, req, res) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Something went wrong. Just refresh the page!');
});

console.log("Stealth Proxy engine starting on port 8080...");
server.listen(8080);
