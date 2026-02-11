const express = require('express');
const FoodItem = require('../models/FoodItem');
const router = express.Router();

router.post('/post', async (req, res) => {
  const { donorId, itemName, quantity, expiryDate, location } = req.body;
  const item = new FoodItem({ donorId, itemName, quantity, expiryDate, location });
  await item.save();
  res.json({ message: 'Food posted' });
});

router.get('/available', async (req, res) => {
  const items = await FoodItem.find({ claimed: false });
  res.json(items);
});

router.post('/claim/:id', async (req, res) => {
  await FoodItem.findByIdAndUpdate(req.params.id, { claimed: true });
  res.json({ message: 'Food claimed' });
});

module.exports = router;