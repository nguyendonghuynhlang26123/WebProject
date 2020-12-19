const Post = require('../../../models/post.schema');

async function createPost(post_author) {
  let data = {
    post_title: 'Untitled',
    post_author: post_author,
  };
  post = await Post.create(data);
  return post;
}

async function getPostById(postId) {
  const post = await Post.findOne({ _id: postId }).populate(
    'post_category post_author',
    'first_name last_name category_name category_slug'
  );
  return post;
}

async function getPostBySlug(postSlug) {
  const post = await Post.findOne({ slug: postSlug }).populate(
    'post_category post_author _id',
    'first_name last_name category_name category_slug'
  );
  return post;
}

async function getAllPost(filter, select, limit) {
  const posts = await Post.find(
    filter,
    {
      post_content: 0,
      post_thumbnail_description: 0,
      post_status: 0,
      post_tags: 0,
    },
    {
      limit: limit,
      populate: { path: 'post_author', select: 'first_name last_name' },
    }
  );
  if (!posts) return null;
  posts.forEach((post) => {
    let post_des_list = post.post_description.split(' ');
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(' ') + ' ...';
      return post.post_description;
    }
  });
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

async function searchPost(key, category, order_by, limit) {
  let queryFind = { $text: { $search: key } };
  if (category) queryFind['post_category'] = { $in: category };
  console.log(key, category, order_by, limit);

  const posts = await Post.find(
    queryFind,
    {
      post_content: 0,
      post_thumbnail_description: 0,
      post_status: 0,
      post_tags: 0,
    },
    {
      limit: limit,
      populate: { path: 'post_author', select: 'first_name last_name' },
    }
  ).sort({ post_date: order_by === 'asc' ? 1 : -1 });
  if (!posts) return null;
  posts.forEach((post) => {
    let post_des_list = post.post_description.split(' ');
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(' ') + ' ...';
      return post.post_description;
    }
  });
  return posts;
}

module.exports = {
  createPost: createPost,
  getPostById: getPostById,
  getAllPost: getAllPost,
  deletePost: deletePost,
  updatePostById: updatePostById,
  delCategoryId: delCategoryId,
  getPostBySlug: getPostBySlug,
  searchPost: searchPost,
};
