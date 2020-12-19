const express = require('express');
const categoryService = require('../../categories/services/category.service');
const router = express.Router();

router.get('/', async function (req, res, next) {
  let listCate = await categoryService.getAllCategory('category_name');

  res.render('searchPage/searchPage', { categories: listCate });
});

module.exports = router;
