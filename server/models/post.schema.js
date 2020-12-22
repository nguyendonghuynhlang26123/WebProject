const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};
mongoose.plugin(slug, options);

const PostSchema = new Schema({
  post_title: { type: String, default: "Untitled", text: true },
  post_description: { type: String, default: "Description" },
  post_category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    default: "5facea6e14977a06f4db7302",
  },
  post_content: { type: String, default: "" },
  post_thumbnail: {
    type: String,
    default: "/images/alt.png",
  },
  post_thumbnail_description: {
    type: String,
    default: "Thumbnail description",
  },
  post_author: { type: Schema.Types.ObjectId, ref: "users", required: true },
  post_date: { type: Number, default: Date.now() },
  post_tags: [{ type: String, trim: true }],
  post_status: {
    type: String,
    enum: ["Publish", "Draft", "Trash"],
    default: "Draft",
  },
  post_views: { type: Number, default: 0 },
  slug: {
    type: String,
    slug: "post_title",
    slugPaddingSize: 3,
    slugOn: { updateMany: false, findOneAndUpdate: false },
  },
});

module.exports = mongoose.model("posts", PostSchema);
