const subcriberService = require("../services/subcriber.service");
const express = require("express");
const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    const subcriber = await subcriberService.createSubcriber(req.body.email);
    res.send(subcriber);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
