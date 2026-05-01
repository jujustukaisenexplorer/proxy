const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: 'https://www.tiktok.com',
  changeOrigin: true,
  autoRewrite: true,
  followRedirects: true,
  cookieDomainRewrite: "" 
});

const server = http.createServer((req, res) => {
  // This is the most important part to avoid the "Something went wrong" screen
  req.headers['host'] = 'www.tiktok.com';
  req.headers['referrer'] = 'https://www.tiktok.com/';
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  
  proxy.web(req, res);
});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Refreshing connection...');
});

console.log("Stealth Proxy engine active on port 8080...");
server.listen(8080);
