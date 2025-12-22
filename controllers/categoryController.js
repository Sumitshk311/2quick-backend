const Category = require('../models/categoryModel');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public (You can protect it if needed)
const createCategory = async (req, res) => {
  const { name, image, description } = req.body;

  if (!name || !image) {
    return res.status(400).json({ error: 'Name and image are required' });
  }

  try {
    const category = new Category({ name, image, description });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (err) {
    console.error('Error creating category:', err.message);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

module.exports = { getCategories, createCategory };
