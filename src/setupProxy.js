const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const proxyParam = {
    target: 'http://192.168.3.12:9090',
    changeOrigin: true,
  }

  app.use(createProxyMiddleware('/logs/accesses', proxyParam));
};
