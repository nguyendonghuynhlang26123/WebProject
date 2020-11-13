const userService = require("../services/user.service");
const express = require("express");
const router = express.Router();

router.get("/:userId", async function (req, res, next) {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res) {
  const users = await userService.getAllUser();
  res.send(users);
});

router.post("/", async function (req, res) {
  const user = await userService.createUser(
    req.body.username,
    req.body.password,
    req.body.first_name,
    req.body.last_name
  );
  res.send(user);
});

router.delete("/:userId", async function (req, res) {
  const result = await userService.deleteUser(req.params.userId);
  res.send(result);
});

module.exports = router;
