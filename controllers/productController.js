const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// GET FEATURED PRODUCTS
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured products" });
  }
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body, isFeatured: req.body.isFeatured === true },
    { new: true }
  );
  res.json(updated);
};

// TOGGLE FEATURED
const toggleFeatured = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.isFeatured = !product.isFeatured;
  await product.save();
  res.json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getFeaturedProducts,
  toggleFeatured,
};
