const authService = require("../services/auth.service");
const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.session.auth) res.redirect("../writer");
  res.render("signing/login", {
    link: "/style/css/signing.css",
    message: req.session.error,
  });
});

router.post("/login", (req, res) => {
  authService.authenticate(
    req.body.username,
    req.body.password,
    (err, user) => {
      if (user) {
        req.session.regenerate(() => {
          req.session.auth = true;
          req.session.userId = user._id;
          res.redirect("../user/writer");
        });
      } else {
        req.session.error = `${err}. Authentication failed, please check your username and password.`;
        res.redirect("/auth/login");
      }
    }
  );
});

router.get("/register", (req, res) => {
  res.render("signing/register", {
    link: "/style/css/signing.css",
    message: req.session.error,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
