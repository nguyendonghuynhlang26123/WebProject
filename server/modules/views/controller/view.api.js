const viewService = require("../services/view.service");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    if (!req.query.month && !req.query.year) {
      const views = await viewService.getAllView();
      res.send(views);
      return;
    }
    const view = await viewService.getViewByMonthYear(
      req.query.month,
      req.query.year
    );
    res.send(view);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
