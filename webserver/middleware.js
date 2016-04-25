var middleware = {
  auth: function(req, res, next) {
    console.log('auth required');
    next();
  },

  logger: function(req, res, next) {
    console.log(req.method + ' ' + req.url + ' HTTP/1.1');
    next();
  }

};

module.exports = middleware;