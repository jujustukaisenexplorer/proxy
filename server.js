const { spawn } = require('child_process');

// This starts the local-cors-proxy engine as a background process on port 8080
const lcp = spawn('npx', ['local-cors-proxy', '--port', '8080', '--proxyUrl', 'https://www.tiktok.com', '--credentials']);

lcp.stdout.on('data', (data) => {
  console.log(`Proxy Output: ${data}`);
});

lcp.stderr.on('data', (data) => {
  console.error(`Proxy Error: ${data}`);
});

console.log("Proxy engine is starting on port 8080...");
