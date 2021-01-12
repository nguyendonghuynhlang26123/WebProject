const User = require('../../../models/user.schema');
const postService = require('../../posts/services/post.service');
const sendMailService = require('../../sendMail/sendMail.service');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hashSync(password, saltRounds);
  return hash;
}

async function createUser({
  username,
  password,
  first_name,
  last_name,
  email,
  list_post,
}) {
  const user = await User.findOne(
    { username: username },
    { password: 0 },
    { email: email }
  );
  if (user) return null;
  let data = {
    username: username,
    password: password,
    first_name: first_name || null,
    last_name: last_name || null,
    email: email || null,
    list_post: list_post || [],
    user_role: 'writer',
    created_at: Date.now(),
  };
  data.password = await hashPassword(data.password);
  return await User.create(data);
}

async function getUserById(userId) {
  const user = await User.findOne({ _id: userId }, { password: 0 }).populate({
    path: 'list_post.post_id',
    select:
      'post_title post_thumbnail post_date post_status post_category post_views',
    populate: { path: 'post_category', select: 'category_name' },
  });
  return user;
}

async function resetPassword(username, email) {
  if (!email || !username) throw new Error('Cannot Reset Password!');
  const user = await User.findOne({ username: username });
  if (!user) throw new Error('Not Found User!');
  if (email != user.email) throw new Error('Email Did Not Match!');
  let newPassword = `${Math.random().toString(36).substr(3, 6)}`;
  newPassword = `${Math.random().toString(36).substr(3, 6)}`;
  user.password = await hashPassword(newPassword);
  const mailOption = {
    from: 'thependailynews@gmail.com',
    to: user.email,
    subject: `Reset password for user: ${user.username}`,
    html: `Dear Writer,
    <br><br>
    We received a request to reset password of your account, please use below login details:
    <br><br>
    <b>Username: </b> ${user.username}
    <br>
    <b>Password: </b> ${newPassword}
    <br><br>
    The Pen Daily.`,
  };
  sendMailService.sendMail(mailOption);
  const result = await User.updateOne({ _id: user._id }, user);
  return result;
}

async function getAllUser({ role, limit }) {
  const users = await User.find(
    { user_role: role },
    { password: 0 },
    { limit: limit }
  );
  return users;
}

async function updateUserById(userId, dataUpdate) {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error('Update error! Not found user');
  delete dataUpdate.password;
  delete dataUpdate.username;
  const result = await User.updateOne({ _id: user._id }, dataUpdate);
  return result;
}

async function addPostId(userId, postId) {
  let user = await User.findOne({ _id: userId });
  if (!user) throw new Error('Add error! Not found user');
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
  if (!user) throw new Error('Update password error! Not found user');
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

function countFrequency(arr) {
  var labels = [],
    counts = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      labels.push(arr[i]);
      counts.push(1);
    } else {
      counts[counts.length - 1]++;
    }
    prev = arr[i];
  }

  let result = labels.map((l, i) => ({ label: l, count: counts[i] }));
  result.sort((a, b) => (a.count > b.count ? -1 : 1));
  return result;
}

async function getUserFavoriteCategory(id) {
  let user = await getUserById(id);
  //console.log(user);
  let categories = user.list_post.map(
    (p) => p.post_id.post_category.category_name
  );
  const frequency = countFrequency(categories);
  if (frequency.length >= 2) return [frequency[0], frequency[1]];
  else if (frequency.length === 1) return [frequency[0]];
  else return [];
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
  resetPassword: resetPassword,
  getUserFavoriteCategory: getUserFavoriteCategory,
};
