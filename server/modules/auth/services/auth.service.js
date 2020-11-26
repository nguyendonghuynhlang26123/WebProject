const userService = require("../../users/services/user.service");
const bcrypt = require("bcrypt");

async function authenticate(username, password, fn) {
  const user = await userService.getUserByUsername(username);
  if (!user) return fn(new Error("Cannot find user"));
  if (!bcrypt.compareSync(password, user.password))
    return fn(new Error("Invalid password"));
  return fn(null, user);
}

function restrict(req, res, next) {
  if (req.session.auth) {
    next();
  } else {
    req.session.error = "Access denied! Please login.";
    res.redirect("/auth/login");
  }
}

module.exports = {
  authenticate: authenticate,
  restrict: restrict,
};
