const postService = require('../services/post.service');
const categoryService = require('../../categories/services/category.service');
const authService = require('../../auth/services/auth.service');
const userService = require('../../users/services/user.service');
const express = require('express');
const router = express.Router();

router.get('/slug/:postSlug', async function (req, res, next) {
  try {
    const post = await postService.getPostBySlug(req.params.postSlug);
    res.render('post/post', {
      link: '/style/css/post.css',
      post: post,
      btn_label: 'Subscribe',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:postId', async function (req, res, next) {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (req.session.userId && req.session.userId == post.post_author._id) {
      if (req.query.mode == 'preview') {
        res.render('post/post', {
          link: '/style/css/post.css',
          post: post,
          btn_label: 'Edit this post',
        });
        return;
      }
      res.redirect(`./${post._id}/edit`);
      return;
    }
    res.render('post/post', {
      link: '/style/css/post.css',
      post: post,
      btn_label: 'Subscribe',
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:postId/edit',
  authService.restrict,
  async function (req, res, next) {
    try {
      const post = await postService.getPostById(req.params.postId);
      if (req.session.userId && req.session.userId == post.post_author._id) {
        const categoryLists = await categoryService.getAllCategory();
        res.render('compose/compose', { cateList: categoryLists, post: post });
        return;
      }
      res.redirect(`../${post._id}`);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async function (req, res) {
  let posts;
  if (req.query.order_by === 'view') {
    delete req.query.order_by;
    delete req.query.limit;
    posts = await postService.getAllPostByViews(req.query, req.query.limit);
  } else posts = await postService.getAllPost(req.query);
  res.send(posts);
});

router.get('/search/:key', async function (req, res) {
  console.log('log ~ file: post.api.js ~ line 70 ~ req', req.query);
  const posts = await postService.searchPost(
    req.params.key,
    req.query.category,
    req.query.order_by,
    10
  );
  res.send(posts);
});

router.get('/searchPost/query', async function (req, res) {
  try {
    console.log(req.query);
    const result = await postService.searchPostPage(
      req.query.key,
      req.query.category,
      req.query.order_by,
      req.query.perPage,
      req.query.page
    );
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get('/tag/:tagName', async function (req, res, next) {
  try {
    console.log(req.params.tagName);
    const posts = await postService.getAllPost(
      {
        post_tags: req.params.tagName,
      },
      req.query.select,
      Number(req.query.n_post)
    );
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', authService.restrict, async function (req, res) {
  const post = await postService.createPost(req.session.userId);
  userService.addPostId(req.session.userId, post._id);
  res.redirect('./' + post._id + '/edit');
});

router.put('/:postId', async function (req, res, next) {
  try {
    const result = await postService.updatePostById(
      req.params.postId,
      req.body
    );
    res.send({ status: 200 });
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:postId',
  authService.restrict,
  async function (req, res, next) {
    try {
      console.log('Delete req received');
      const post = await postService.getPostById(req.params.postId);

      if (!post || post.post_author._id != req.session.userId)
        return next({ message: 'Access Denied' });

      let result = await postService.deletePost(req.params.postId);
      result = await userService.delPostId(req.session.userId, post._id);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
