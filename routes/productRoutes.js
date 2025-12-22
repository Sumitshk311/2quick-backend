const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getFeaturedProducts,
  toggleFeatured,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.patch("/toggle-featured/:id", toggleFeatured);

module.exports = router;
