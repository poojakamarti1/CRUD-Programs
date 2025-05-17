const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ProductId:{
    type:Number,
    required:true,
    trim:true
  },
  Ratings:{
    type:Number,
    required:true,
    trim:true
  },
  Description:{
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Product', ProductSchema)