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
  // 1. Pretend to be a real browser
  req.headers['host'] = 'www.tiktok.com';
  req.headers['referrer'] = 'https://www.tiktok.com/';
  req.headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
  
  // 2. Hide the fact that we are a proxy
  req.headers['x-forwarded-for'] = req.connection.remoteAddress;
  req.headers['accept-language'] = 'en-US,en;q=0.9';

  proxy.web(req, res);
});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Bridge is resetting... please refresh.');
});

console.log("Ultra-Stealth Proxy active on port 8080...");
server.listen(8080);
