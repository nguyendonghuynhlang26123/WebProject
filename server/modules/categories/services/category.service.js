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

async function getCategoryBySlug(categorySlug) {
  const category = await Category.findOne({ category_slug: categorySlug });
  return category;
}

async function getAllCategory(select, limit) {
  const categorys = await Category.find({}, select, { limit: limit });
  return categorys;
}

async function updateCategoryById(categoryId, dataUpdate) {
  const category = await Category.findOne({ _id: categoryId });
  if (!category) return;
  const result = await Category.updateOne({ _id: category._id }, dataUpdate);
  return result;
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
  updateCategoryById: updateCategoryById,
  getCategoryBySlug: getCategoryBySlug,
};
