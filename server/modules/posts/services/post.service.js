const Post = require("../../../models/post.schema");

async function createPost(post_author) {
  let data = {
    post_author: post_author,
  };
  post = await Post.create(data);
  return post;
}

async function getPostById(postId) {
  const post = await Post.findOne({ _id: postId }).populate(
    "post_category post_author",
    "first_name last_name category_name category_slug"
  );
  return post;
}

async function getAllPost(select, limit) {
  const posts = await Post.find({}, select, { limit: limit });
  return posts;
}

async function updatePostById(postId, dataUpdate) {
  const post = await Post.findOne({ _id: postId });
  if (!post) return;
  const result = await Post.updateOne({ _id: post._id }, dataUpdate);
  return result;
}

async function delCategoryId(categoryId) {
  const posts = await Post.find();
  if (!posts) return;
  posts.forEach((e) => {
    e.post_category = null;
    Post.updateOne({ _id: e._id }, e);
  });
}

async function deletePost(postId) {
  const result = await Post.deleteOne({ _id: postId }).exec();
  return result;
}

module.exports = {
  createPost: createPost,
  getPostById: getPostById,
  getAllPost: getAllPost,
  deletePost: deletePost,
  updatePostById: updatePostById,
  delCategoryId: delCategoryId,
};
