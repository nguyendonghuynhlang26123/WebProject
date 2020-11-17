const userService = require("../services/user.service");
const authService = require("../../auth/services/auth.service");
const express = require("express");
const router = express.Router();

router.get("/writer", authService.restrict, async (req, res, next) => {
  try {
    let user = await userService.getUserById(req.session.userId);
    res.render("writerPage/dashboard", { user: user });
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res) {
  const users = await userService.getAllUser();
  res.send(users);
});

router.post("/", async function (req, res, next) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.session.error = "Password and confirm password not match.";
      res.redirect("/auth/register");
      return;
    }
    const user = await userService.createUser(
      req.body.username,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.list_post
    );
    if (!user) {
      req.session.error = "Username already exists.";
      res.redirect("/auth/register");
      return;
    }
    res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
});

router.put("/", authService.restrict, async function (req, res, next) {
  try {
    const result = await userService.updateUserById(
      req.session.userId,
      req.body
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.put("/change-password", authService.restrict, async function (
  req,
  res,
  next
) {
  try {
    const result = await userService.changePassword(
      req.session.userId,
      req.body.newPassword
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", async function (req, res) {
  const result = await userService.deleteUser(req.params.userId);
  res.send(result);
});

module.exports = router;
