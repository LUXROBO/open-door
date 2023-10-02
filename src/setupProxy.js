const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const localDebug = LOCAL_DEBUG;

  console.log(`DEBUG => ${localDebug}`);

  let proxyParam = {};
  if (localDebug) {
    proxyParam = {
      target: 'http://localhost:9183',
      // target: 'http://192.168.3.12:9090',
      changeOrigin: true,
    };
  } else {
    proxyParam = {
      target: 'http://192.168.3.12:9090',
      changeOrigin: true,
    };
  }

  app.use(createProxyMiddleware('/logs/accesses', proxyParam));
};
