const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post_title: { type: String, required: true },
  post_description: { type: String, default: null },
  post_category: { type: Schema.Types.ObjectId, ref: "categories" },
  post_content: { type: String, required: true },
  post_thumbnail: { type: String, default: null },
  post_thumbnail_description: { type: String, default: null },
  post_author: { type: String, required: true },
  post_date: { type: Number, default: Date.now() },
  post_tags: { type: [String] },
});

module.exports = mongoose.model("posts", PostSchema);
