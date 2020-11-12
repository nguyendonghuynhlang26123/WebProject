const Category = require("../../../models/category.schema");

async function createCategory(category_name, category_slug) {
  let data = {
    category_name: category_name,
    category_slug: category_slug,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  category = await Category.create(data);
  return category;
}

async function getCategoryById(categoryId) {
  const category = await Category.findOne({ _id: categoryId });
  return category;
}

async function getAllCategory(select, limit) {
  const categorys = await Category.find({}, select, { limit: limit });
  return categorys;
}

async function deleteCategory(categoryId) {
  const result = await Category.deleteOne({ _id: categoryId }).exec();
  return result;
}

module.exports = {
  createCategory: createCategory,
  getCategoryById: getCategoryById,
  getAllCategory: getAllCategory,
  deleteCategory: deleteCategory,
};
