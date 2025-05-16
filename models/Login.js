const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // You might want to ensure email uniqueness
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/  // Email validation regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6  // Password should have a minimum length
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,  // Change to String for phone numbers
    required: true,
    minlength: 10,  // Minimum length for phone numbers (example)
    maxlength: 15   // Maximum length for phone numbers
  },
  login: {
    type: String,
    enum: ['success', 'not-success'],  // Enum for login statuses
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Login', LoginSchema);