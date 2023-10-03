const { createProxyMiddleware } = require('http-proxy-middleware');

/* set up a proxy to bypass CORS policy */
module.exports = function (app) {
  const localDebug = process.env.REACT_APP_LOCAL_DEBUG;
  let proxyURL = 'http://192.168.3.12:9090';

  if (localDebug === 'on') {
    proxyURL = 'http://localhost:9198';
  }

  const proxyParam = {
    target: proxyURL,
    changeOrigin: true,
  }

  app.use(createProxyMiddleware('/logs/accesses', proxyParam));
};
