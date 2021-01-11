const subscriber = require('../../../models/subscriber.schema');

async function createSubscriber(email) {
  const sub = await subscriber.findOne({ email: email });
  if (sub) throw new Error('Create Error! subscriber Already Exists');
  let data = {
    email: email,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  return await subscriber.create(data);
}

async function getAllSubscriber() {
  const subscribers = await subscriber.find({}, 'email', {});
  let data = [];
  subscribers.forEach((subscriber) => {
    data.push(subscriber.email);
  });
  return data;
}

async function getAll(q) {
  const subscribers = await subscriber.find();
  return subscribers;
}

module.exports = {
  createSubscriber: createSubscriber,
  getAllSubscriber: getAllSubscriber,
  getAll: getAll,
};
