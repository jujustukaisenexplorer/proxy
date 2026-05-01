const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'https://www.tiktok.com',
  changeOrigin: true, // This is the fix for the 1-second crash
  autoRewrite: true,
  followRedirects: true
});

const server = http.createServer((req, res) => {
  // This makes sure everything goes through the proxy
  proxy.web(req, res, { target: 'https://www.tiktok.com' });
});

console.log("Proxy engine starting on port 8080...");
server.listen(8080);
