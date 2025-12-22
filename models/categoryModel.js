// models/categoryModel.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  route: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);
