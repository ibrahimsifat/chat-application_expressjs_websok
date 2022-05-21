const createError = require("http-errors");

//404 error
function notFoundHandler(req, res, next) {
  next(createError(404, "your request is not found"));
}
function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { massage: err.massage };
  res.status(err.status || 500);

  if (res.locals.html) {
    //html response
    res.render("error", {
      title: "Error page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
}
module.exports = {
  notFoundHandler,
  errorHandler,
};
