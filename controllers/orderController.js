const Order = require("../models/Order");

// Place New Order
const placeOrder = async (req, res) => {
  try {
    const { items, subtotal, deliveryCharges, total, customer } = req.body;

    if (!items || !subtotal || !total || !customer || !customer.phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      items,
      subtotal,
      deliveryCharges,
      total,
      customer,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get Orders by Phone
const getOrdersByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const orders = await Order.find({ "customer.phone": phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders by phone:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrdersByPhone,
  updateOrderStatus,
};
