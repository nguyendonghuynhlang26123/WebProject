const postService = require("../services/post.service");
const categoryService = require("../../categories/services/category.service");
const authService = require("../../auth/services/auth.service");
const userService = require("../../users/services/user.service");
const express = require("express");
const { get } = require("mongoose");
const router = express.Router();

router.get("/:postId", async function (req, res, next) {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (req.session.userId && req.session.userId == post.post_author._id) {
      res.redirect(`./${post._id}/edit`);
      return;
    }
    res.render("post/post", { link: "/style/css/post.css", post: post });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:postId/edit",
  authService.restrict,
  async function (req, res, next) {
    try {
      const categoryLists = await categoryService.getAllCategory();
      const post = await postService.getPostById(req.params.postId);

      res.render("compose/compose", { cateList: categoryLists, post: post });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async function (req, res) {
  const posts = await postService.getAllPost();
  res.send(posts);
});

router.post("/", authService.restrict, async function (req, res) {
  const post = await postService.createPost(req.session.userId);
  userService.addPostId(req.session.userId, post._id);
  res.redirect("./" + post._id + "/edit");
});

router.put("/:postId", async function (req, res, next) {
  console.log("PUT REQ RECEIVED", req.body);
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
  "/:postId",
  authService.restrict,
  async function (req, res, next) {
    try {
      console.log("Delete req received");
      const post = await postService.getPostById(req.params.postId);

      if (!post || post.post_author._id != req.session.userId)
        return next({ message: "Access Denied" });

      let result = await postService.deletePost(req.params.postId);
      result = await userService.delPostId(req.session.userId, post._id);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
