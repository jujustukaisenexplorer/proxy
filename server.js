const proxy = require('local-cors-proxy');
proxy.run({
    port: 8080,
    proxyPartial: '',
    proxyUrl: 'https://www.tiktok.com',
    credentials: true
});
