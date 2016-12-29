const basicAuth = require('basic-auth');

exports.default = (username, password) => {
  return function basicAuthCheck(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    return next();
  };
};
