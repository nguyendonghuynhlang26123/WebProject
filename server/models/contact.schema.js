const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  type: {
    type: String,
    default: 'contactUs',
    enum: ['contactUs', 'advertise', 'correction', 'tip'],
  },
  description: { type: String, required: true },
  status: {
    type: String,
    default: 'waiting',
    enum: ['waiting', 'done'],
  },
  created_at: { type: Number, default: Date.now() },
  updated_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('contacts', ContactSchema);
