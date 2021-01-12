const tagService = require('../services/tag.service');
const postService = require('../../posts/services/post.service');
const categoryService = require('../../categories/services/category.service');
const express = require('express');
const router = express.Router();

router.get('/:tagName', async function (req, res, next) {
  try {
    const posts = await postService.getAllPost(
      {
        post_tags: req.params.tagName,
        post_status: 'Publish',
      },
      req.query.select,
      Number(req.query.limit),
      null
    );
    //res.send(posts);
    // TO DO: Render Tag
    res.render('tagPages/tagPage', {
      posts: posts,
      tag: req.params.tagName,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async function (req, res) {
  const tag = await tagService.createTag(req.body.tag_name);
  res.send(tag);
});

module.exports = router;
