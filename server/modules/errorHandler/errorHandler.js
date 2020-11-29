module.exports = (err, req, res, next) => {
<<<<<<< HEAD
=======
  // if (req.session.auth) req.session.auth = false;
>>>>>>> 6b409fb7c85cc3e4b115c69d5df937b0508efe66
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).render("notifyPages/error", {
    err: { code: err.statusCode, message: err.message },
  });
};
