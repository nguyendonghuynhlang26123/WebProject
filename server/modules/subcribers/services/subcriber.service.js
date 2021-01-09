const Subcriber = require("../../../models/subcriber.schema");

async function createSubcriber(email) {
  const sub = await Subcriber.findOne({ email: email });
  if (sub) throw new Error("Create error! Subcriber Already Exists");
  let data = {
    email: email,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  subcriber = await Subcriber.create(data);
  return subcriber;
}

async function getAllSubcriber() {
  const subcribers = await Subcriber.find({}, "email", {});
  let data = [];
  subcribers.forEach((subcriber) => {
    data.push(subcriber.email);
  });
  return data;
}

module.exports = {
  createSubcriber: createSubcriber,
  getAllSubcriber: getAllSubcriber,
};
