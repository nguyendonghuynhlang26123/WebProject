const Post = require("../../../models/post.schema");

async function createPost(
  post_title,
  post_description,
  post_category,
  post_content,
  post_thumbnail,
  post_thumbnail_description,
  post_author,
  post_date,
  post_tags
) {
  let data = {
    post_title: post_title,
    post_description: post_description,
    post_category: post_category,
    post_content: post_content,
    post_thumbnail: post_thumbnail,
    post_thumbnail_description: post_thumbnail_description,
    post_author: post_author,
    post_date: post_date,
    post_tags: post_tags,
  };
  post = await Post.create(data);
  return post;
}

async function getPostById(postId) {
  const post = await Post.findOne({ _id: postId }).populate("post_category");
  return post;
}

async function getAllPost(select, limit) {
  const posts = await Post.find({}, select, { limit: limit });
  return posts;
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
};
