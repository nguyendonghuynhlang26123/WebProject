const categoryService = require("../services/category.service");
const postService = require("../../posts/services/post.service");
const express = require("express");
const router = express.Router();

router.get("/:categoryId", async function (req, res, next) {
  try {
    const category = await categoryService.getCategoryById(
      req.params.categoryId
    );
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
    req.body.category_slug
  );
  res.send(category);
});

router.put("/:categoryId", async function (req, res, next) {
  try {
    const result = await categoryService.updateCategoryById(
      req.params.categoryId,
      req.body
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:categoryId", async function (req, res) {
  const result = await categoryService.deleteCategory(req.params.categoryId);
  postService.delCategoryId(req.params.categoryId);
  res.send(result);
});

module.exports = router;
