const categoryService = require('../services/category.service');
const postService = require('../../posts/services/post.service');
const express = require('express');
const router = express.Router();

router.get('/:categorySlug', async function (req, res, next) {
  try {
    let category = await categoryService.getCategoryBySlug(
      req.params.categorySlug
    );
    const posts = await postService.getAllPost(
      {
        post_category: category._id,
        post_status: 'Publish',
      },
      req.query.select,
      Number(req.query.limit)
    );
    console.log(posts.length);
    res.render('categoryPages/categoryPage', {
      category: category,
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/get/:categorySlug', async function (req, res) {
  try {
    let category = await categoryService.getCategoryBySlug(
      req.params.categorySlug
    );
    const posts = await postService.getAllPost(
      {
        post_category: category._id,
        post_status: 'Publish',
      },
      req.query.select,
      Number(req.query.limit)
    );
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', async function (req, res) {
  const category = await categoryService.createCategory(
    req.body.category_name,
    req.body.category_slug
  );
  res.send(category);
});

router.put('/:categoryId', async function (req, res, next) {
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

router.delete('/:categoryId', async function (req, res) {
  const result = await categoryService.deleteCategory(req.params.categoryId);
  postService.delCategoryId(req.params.categoryId);
  res.send(result);
});

module.exports = router;
