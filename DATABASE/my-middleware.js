module.exports = function(options) /* mymiddlewarefunction */ {
  return function(req, res, next) {
    req.option1 = options.option1;
    req.option2 = options.option2;
    req.option3 = Date.now();
    next();
  };
};
