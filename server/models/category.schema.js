const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};
mongoose.plugin(slug, options);

const CategorySchema = new Schema({
  category_name: { type: String, required: true },
  category_slug: {
    type: String,
    slug: "category_name",
    slugPaddingSize: 3,
    slugOn: { updateMany: false, findOneAndUpdate: false },
  },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("categories", CategorySchema);
