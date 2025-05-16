const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Login = require('../models/Login');

// Get all login items
router.get('/', async (req, res) => {
  try {
    const loginItems = await Login.find();
    res.json(loginItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login items', error: error.message });
  }
});

// Get a single login item
router.get('/:id', async (req, res) => {
  try {
    const loginItem = await Login.findById(req.params.id);
    if (!loginItem) {
      return res.status(404).json({ message: 'Login item not found' });
    }
    res.json(loginItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login item', error: error.message });
  }
});

// Create a new login item
router.post('/', async (req, res) => {
  try {
    const { name, email, password, address, mobile, login } = req.body;

    // Check if the email already exists
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const loginItem = new Login({
      name,
      email,
      password: hashedPassword,
      address,
      mobile,
      login,
    });

    await loginItem.save();
    res.status(201).json(loginItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating login item', error: error.message });
  }
});

// Update a login item completely (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, address, mobile, login } = req.body;

    // If password is being updated, hash it
    let updatedPassword = password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const loginItem = await Login.findByIdAndUpdate(
      req.params.id,
      { name, email, password: updatedPassword, address, mobile, login },
      { new: true, runValidators: true }
    );

    if (!loginItem) {
      return res.status(404).json({ message: 'Login item not found' });
    }
    res.json(loginItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating login item', error: error.message });
  }
});

// Partially update a login item (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const loginItem = await Login.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!loginItem) {
      return res.status(404).json({ message: 'Login item not found' });
    }
    res.json(loginItem);
  } catch (error) {
    res.status(400).json({ message: 'Error partially updating login item', error: error.message });
  }
});

// Delete a login item
router.delete('/:id', async (req, res) => {
  try {
    const loginItem = await Login.findByIdAndDelete(req.params.id);
    if (!loginItem) {
      return res.status(404).json({ message: 'Login item not found' });
    }
    res.json({ message: 'Login item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting login item', error: error.message });
  }
});

module.exports = router;