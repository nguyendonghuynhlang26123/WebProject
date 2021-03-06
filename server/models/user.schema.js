const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  list_post: [
    {
      post_id: { type: Schema.Types.ObjectId, ref: "posts" },
    },
  ],
  user_role: { type: String, default: "writer", enum: ["writer", "admin"] },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("users", UserSchema);
