const categoryService = require("../services/category.service");
const express = require("express");
const router = express.Router();

router.get("/:categoryId", async function (req, res, next) {
  try {
    const category = await categoryService.getCategoryById(req.params.categoryId);
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res) {
  const categorys = await categoryService.getAllCategory();
  res.send(categorys);
});

router.post("/", async function (req, res) {
  const category = await categoryService.createCategory(
    req.body.category_name,
    req.body.category_slug,
  );
  res.send(category);
});

router.delete("/:categoryId", async function (req, res) {
  const result = await categoryService.deletePost(req.params.categoryId);
  res.send(result);
});

module.exports = router;