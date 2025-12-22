// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// Add new category
router.post('/', async (req, res) => {
  try {
    const { name, image, route, description } = req.body;

    if (!name || !image || !route) {
      return res.status(400).json({ message: 'Name, Image and Route are required' });
    }

    const existingCategory = await Category.findOne({ route });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this route already exists' });
    }

    const category = new Category({
      name,
      image,
      route,
      description: description || ''
    });

    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add category' });
  }
});

module.exports = router;
