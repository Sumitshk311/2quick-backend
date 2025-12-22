const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    city: String,
    address: String,
    landmark: String,
    paymentMethod: String,
  },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      unit: String,
      image: String,
    },
  ],
  subtotal: Number,
  deliveryCharges: Number,
  total: Number,
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
