const express = require('express');
const router = express.Router();
const Product= require('../models/Product');

// Get all items
router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get a single item
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, ProductId, Ratings, Description } = req.body;
    const  product= new Product({
      name,
      ProductId,
      Ratings,
      Description,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item' });
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const { name, ProductId, Ratings, Description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, ProductId, Ratings, Description },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router; 