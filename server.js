const { spawn } = require('child_process');

// The --changeOrigin flag is the "magic" that stops the redirect crash
const lcp = spawn('npx', [
    'local-cors-proxy', 
    '--port', '8080', 
    '--proxyUrl', 'https://www.tiktok.com', 
    '--credentials',
    '--changeOrigin' 
]);

lcp.stdout.on('data', (data) => { console.log(`Proxy: ${data}`); });
lcp.stderr.on('data', (data) => { console.error(`Error: ${data}`); });
