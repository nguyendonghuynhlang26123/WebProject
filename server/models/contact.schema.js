const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  status: {type: String, default: null, enum: [] },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("contacts", ContactSchema);
