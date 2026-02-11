const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemName: String,
  quantity: Number,
  expiryDate: Date,
  claimed: { type: Boolean, default: false },
  location: String
});

module.exports = mongoose.model('FoodItem', foodItemSchema);