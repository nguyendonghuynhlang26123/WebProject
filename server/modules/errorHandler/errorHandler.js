module.exports = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).render("notifyPages/error", {
    err: { code: err.statusCode, message: err.message },
  });
};
