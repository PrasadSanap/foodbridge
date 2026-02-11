const express = require('express');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');
const router = express.Router();

// Simple matching: nearest NGO gets notified
router.get('/smart-match', async (req, res) => {
  const items = await FoodItem.find({ claimed: false });
  const ngos = await User.find({ role: 'ngo' });

  // Basic matching logic (can be enhanced with geolocation)
  const matches = items.map(item => {
    return {
      food: item.itemName,
      quantity: item.quantity,
      suggestedNGO: ngos[Math.floor(Math.random() * ngos.length)].name
    };
  });

  res.json(matches);
});

module.exports = router;