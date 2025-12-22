const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getOrdersByPhone,
  updateOrderStatus
} = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/", getAllOrders);
router.get("/user/:phone", getOrdersByPhone);
router.put("/:id", updateOrderStatus);

module.exports = router;
