const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post_title: { type: String, default: "Title" },
  post_description: { type: String, default: "Description" },
  post_category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    default: null,
  },
  post_content: { type: String, default: "" },
  post_thumbnail: { type: String, default: "" },
  post_thumbnail_description: { type: String, default: "" },
  post_author: { type: Schema.Types.ObjectId, ref: "users", required: true },
  post_date: { type: Number, default: Date.now() },
  post_tags: { type: [String] },
  post_status: {
    type: String,
    enum: ["Published", "Draft", "Trash"],
    default: "Draft",
  },
});

module.exports = mongoose.model("posts", PostSchema);
