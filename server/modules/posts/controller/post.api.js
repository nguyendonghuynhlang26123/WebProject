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

router.get('/popular', async function (req, res) {
  let query = {};
  if (req.query.category) query['post_category'] = req.query.category;
  query['post_status'] = 'Publish';
  let posts = await postService.getAllPostByViews(query, req.query.limit);
  res.send(posts);
});

router.get('/:postId', async function (req, res, next) {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (req.session.userId && req.session.userId == post.post_author._id) {
      if (req.query.mode == 'preview') {
        res.render('post/post', {
          link: '/style/css/post.css',
          post: post,
          btn_label: 'Back to dashboard',
        });
        return;
      }
      res.redirect(`./${post._id}/edit`);
      return;
    }
    if (post.post_status != 'Publish') throw new Error('Not Found Post!');
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
  let query = { ...req.query };
  if (!query.filter) query.filter = {};
  query.filter['post_status'] = 'Publish';
  let posts = await postService.getAllPost(
    query.filter,
    query.populate,
    query.limit,
    query.sortBy
  );
  res.send({ data: posts });
});

router.get('/search/:key', async function (req, res) {
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
      const post = await postService.getPostById(req.params.postId);

      console.log('Delete req received', post);
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
