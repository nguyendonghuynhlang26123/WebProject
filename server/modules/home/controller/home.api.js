const express = require('express');
const router = express.Router();
const postService = require('../../posts/services/post.service');
const categoryService = require('../../categories/services/category.service');
const viewService = require('../../views/services/view.service');
const tagService = require('../../tags/services/tag.service');
const { post } = require('../../users/controller/user.api');

router.get('/', async function (req, res) {
  viewService.updateView();
  const data = await Promise.all([
    categoryService.getAllCategory('category_name category_slug'),
    postService.getAllPostByViews(
      {
        post_status: 'Publish',
      },
      1
    ),
    postService.getAllPost(
      {
        post_status: 'Publish',
      },
      null,
      10
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('Lifestyle'),
        post_status: 'Publish',
      },
      null,
      3
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('International'),
        post_status: 'Publish',
      },
      null,
      6
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('Education'),
        post_status: 'Publish',
      },
      null,
      7
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('Sport'),
        post_status: 'Publish',
      },
      null,
      3
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('Features'),
        post_status: 'Publish',
      },
      null,
      6
    ),
    postService.getAllPost(
      {
        post_category: await categoryService.getCategoryByName('Politics'),
        post_status: 'Publish',
      },
      null,
      7
    ),
    postService.getPostTag(),
  ]);
  res.render('homePage/homePage', {
    link: '/style/css/style.css',
    list_category: data[0],
    hero: data[1][0],
    topnew: data[2],
    lifestyle: data[3],
    international: data[4],
    education: data[5],
    sport: data[6],
    features: data[7],
    politics: data[8],
    tags: data[9],
  });
});
module.exports = router;
