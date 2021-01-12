const Post = require("../../../models/post.schema");

async function createPost(post_author) {
  let data = {
    post_title: "Untitled",
    post_author: post_author,
    post_views: 0,
  };
  post = await Post.create(data);
  return post;
}

async function getPostById(postId) {
  const post = await Post.findOne({ _id: postId }).populate(
    "post_category post_author",
    "first_name last_name category_name category_slug"
  );
  updatePostById(post._id, { post_views: Number(post.post_views + 1) });
  return post;
}

async function getPostBySlug(postSlug) {
  const post = await Post.findOne({
    slug: postSlug,
    post_status: "Publish",
  }).populate(
    "post_category post_author",
    "first_name last_name category_name category_slug"
  );
  updatePostById(post._id, { post_views: Number(post.post_views + 1) });
  return post;
}

async function getAllPostByViews(filter, limit) {
  const posts = await Post.find(
    filter,
    {
      post_content: 0,
      post_thumbnail_description: 0,
      post_status: 0,
      post_tags: 0,
    },
    {
      limit: Number(limit),
      sort: { post_views: "desc" },
    }
  );
  if (!posts) return null;
  posts.forEach((post) => {
    let post_des_list = post.post_description.split(" ");
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(" ") + " ...";
      return post.post_description;
    }
  });
  return posts;
}

async function getAllPost(filter, populate, limit, sortBy) {
  const posts = await Post.find(
    filter,
    {
      post_content: 0,
      post_thumbnail_description: 0,
      post_status: 0,
      post_tags: 0,
    },
    {
      limit: Number(limit),
      populate: {
        path: `post_author ${populate ? populate.path : ""}`,
        select: `first_name last_name ${populate ? populate.select : ""}`,
      },
      sort: sortBy || { post_date: "desc" },
    }
  );
  if (!posts) return null;
  posts.forEach((post) => {
    let post_des_list = post.post_description.split(" ");
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(" ") + " ...";
      return post.post_description;
    }
  });
  return posts;
}

async function updatePostById(postId, dataUpdate) {
  const post = await Post.findOne({ _id: postId });
  if (!post) return;
  if (dataUpdate.post_status == "Publish" && post.post_status != "Publish") {
    Object.assign(dataUpdate, { post_date: Date.now() });
  }
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
  if (category) queryFind["post_category"] = { $in: category };
  queryFind["post_status"] = "Publish";

  if (!key && category == []) {
    queryFind = {};
  }
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
      populate: { path: "post_author", select: "first_name last_name" },
    }
  ).sort({ post_date: order_by === "asc" ? 1 : -1 });
  if (!posts) return null;
  posts.forEach((post) => {
    let post_des_list = post.post_description.split(" ");
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(" ") + " ...";
      return post.post_description;
    }
  });
  return posts;
}

async function searchPostPage(key, category, order_by, perPage, page) {
  let queryFind = {};
  if (key) queryFind["$text"] = { $search: key };
  if (category) queryFind["post_category"] = { $in: category };
  queryFind["post_status"] = "Publish";

  const data = await Promise.all([
    Post.find(
      queryFind,
      {
        post_content: 0,
        post_thumbnail_description: 0,
        post_status: 0,
        post_tags: 0,
      },
      {
        limit: Number(perPage),
        skip: Number((page - 1) * perPage),
        populate: { path: "post_author", select: "first_name last_name" },
        sort: { post_date: order_by || "asc" },
      }
    ),
    await Post.countDocuments(queryFind),
  ]);
  data[0].forEach((post) => {
    let post_des_list = post.post_description.split(" ");
    if (post_des_list.length > 25) {
      post.post_description = post_des_list.slice(0, 25).join(" ") + " ...";
      return post.post_description;
    }
  });

  return {
    posts: data[0],
    results: data[1],
    total_page: Math.ceil(data[1] / perPage),
  };
}

async function getAllNewPost() {
  const date = Date.now() - 86400000;
  const posts = await Post.find(
    { post_date: { $gt: date }, post_status: "Publish" },
    {
      post_content: 0,
      post_thumbnail_description: 0,
      post_status: 0,
      post_tags: 0,
    },
    {
      sort: { post_date: "desc" },
    }
  );
  if (!posts) return null;
  let result = "";
  for (let index = 0; index < posts.length; index++) {
    result += `<a href="https://thependaily.herokuapp.com/post/slug/${
      posts[index].slug
    }">
    <h1>${posts[index].post_title}</h1>
    <img src="https://thependaily.herokuapp.com/${posts[index].post_thumbnail
      .split("/")
      .slice(1)
      .join("/360-")}" 
          alt="https://thependaily.herokuapp.com/images/alt.png" />
    <p>${posts[index].post_description}</p></a><br>`;
  }
  result += "<br>The Pen Daily.";
  return result;
}

async function getPostTag() {
  const posts = await Post.find(
    {},
    {
      post_tags: 1,
    },
    {
      limit: 3,
      sort: { post_views: "desc" },
    }
  );
  if (!posts) return null;
  let tag = new Set();
  posts.forEach((post) => {
    for (let i = 0; i < post.post_tags.length; i++) {
      tag.add(post.post_tags[i]);
    }
  });
  return tag;
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
  searchPostPage: searchPostPage,
  getAllPostByViews: getAllPostByViews,
  getAllNewPost: getAllNewPost,
  getPostTag: getPostTag,
};
