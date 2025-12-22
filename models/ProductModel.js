const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  mrp: Number,
  image: String,
  category: String,
  unit: String,

  isFeatured: {
    type: Boolean,
    default: false,
  },

  variants: [
    {
      quantity: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
