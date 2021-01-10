const Tag = require("../../../models/tag.schema");

async function createTag(tag_name) {
  let data = {
    tag_name: tag_name,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  tag = await Tag.create(data);
  return tag;
}

async function getAllTag(limit) {
  const tags = await Tag.find({}, "tag_name", { limit: limit });
  return tags;
}

module.exports = {
  createTag: createTag,
  getAllTag: getAllTag,
};
