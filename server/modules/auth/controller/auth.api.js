const authService = require("../services/auth.service");
const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("signing/login");
});

router.post("/login", (req, res) => {
  authService.authenticate(
    req.body.username,
    req.body.password,
    (err, user) => {
      if (user) {
        req.session.regenerate(() => {
          req.session.auth = true;
          req.session.success = "Login success.";
          res.redirect("../../");
        });
      } else {
        req.session.error =
          "Authentication failed, please check your username and password.";
        res.redirect("/login");
      }
    }
  );
});

router.get("/register", (req, res) => {
  res.render("signing/register");
});

module.exports = router;
