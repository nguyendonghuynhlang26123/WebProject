const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("subcribers", SubcriberSchema);
