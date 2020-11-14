const User = require("../../../models/user.schema");
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
  user = await User.create(data);
  return user;
}

async function getUserById(userId) {
  const user = await User.findOne({ _id: userId }, { password: 0 }).populate(
    "list_post.post_id",
    "post_title post_thumbnail"
  );
  return user;
}

async function getAllUser(limit) {
  const users = await User.find({}, { password: 0 }, { limit: limit });
  return users;
}

async function deleteUser(userId) {
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
};
