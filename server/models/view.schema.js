const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViewSchema = new Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  views: { type: Number, default: 0 },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("views", ViewSchema);
