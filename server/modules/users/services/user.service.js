const User = require("../../../models/user.schema");
const postService = require("../../posts/services/post.service");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hashSync(password, saltRounds);
  return hash;
}

async function createUser(
  username,
  password,
  first_name,
  last_name,
  list_post
) {
  const user = await User.findOne({ username: username }, { password: 0 });
  if (user) return null;
  let data = {
    username: username,
    password: password,
    first_name: first_name || null,
    last_name: last_name || null,
    list_post: list_post || [],
    created_at: Date.now(),
  };
  data.password = await hashPassword(data.password);
  return await User.create(data);
}

async function getUserById(userId) {
  const user = await User.findOne({ _id: userId }, { password: 0 }).populate(
    "list_post.post_id",
    "post_title post_thumbnail post_date post_status"
  );
  return user;
}

async function getAllUser(limit) {
  const users = await User.find({}, { password: 0 }, { limit: limit });
  return users;
}

async function updateUserById(userId, dataUpdate) {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error("Update error! Not found user");
  delete dataUpdate.password;
  delete dataUpdate.username;
  const result = await User.updateOne({ _id: user._id }, dataUpdate);
  return result;
}

async function addPostId(userId, postId) {
  let user = await User.findOne({ _id: userId });
  if (!user) throw new Error("Add error! Not found user");
  user.list_post.push({ post_id: postId });
  const result = await User.updateOne({ _id: user._id }, user);
  return result;
}

async function delPostId(userId, postId) {
  let user = await User.findOne({ _id: userId });
  if (!user) return;
  user.list_post = user.list_post.filter((e) => {
    return e.post_id.toString() !== postId.toString();
  });
  const result = await User.updateOne({ _id: user._id }, user);
  return result;
}

async function changePassword(userId, newPassword) {
  let user = await User.findOne({ _id: userId });
  if (!user) throw new Error("Update password error! Not found user");
  user.password = await hashPassword(newPassword);
  const result = await User.updateOne({ _id: user._id }, user);
  return result;
}

async function deleteUser(userId) {
  const user = await User.findOne({ _id: userId });
  if (!user) return;
  user.list_post.forEach((e) => {
    postService.deletePost(e);
  });
  const result = await User.deleteOne({ _id: userId }).exec();
  return result;
}

async function getUserByUsername(username) {
  const user = await User.findOne({ username: username });
  return user;
}

module.exports = {
  createUser: createUser,
  getUserById: getUserById,
  getAllUser: getAllUser,
  deleteUser: deleteUser,
  getUserByUsername: getUserByUsername,
  updateUserById: updateUserById,
  changePassword: changePassword,
  addPostId: addPostId,
  delPostId: delPostId,
};
