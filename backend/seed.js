require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const FoodItem = require('./models/FoodItem');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected for seeding');

    // Clear old data
    await User.deleteMany({});
    await FoodItem.deleteMany({});

    // Create demo users
    const hotelPassword = await bcrypt.hash('hotel123', 10);
    const ngoPassword = await bcrypt.hash('ngo123', 10);

    const hotel = new User({
      name: 'Hotel Blue Diamond',
      email: 'hotel@example.com',
      password: hotelPassword,
      role: 'hotel',
      location: 'Pune'
    });

    const ngo = new User({
      name: 'Helping Hands NGO',
      email: 'ngo@example.com',
      password: ngoPassword,
      role: 'ngo',
      location: 'Pune'
    });

    await hotel.save();
    await ngo.save();

    // Create demo food items
    const food1 = new FoodItem({
      donorId: hotel._id,
      itemName: 'Cooked Rice',
      quantity: 50,
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      location: 'Pune'
    });

    const food2 = new FoodItem({
      donorId: hotel._id,
      itemName: 'Bread Loaves',
      quantity: 30,
      expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      location: 'Pune'
    });

    await food1.save();
    await food2.save();

    console.log('Seeding complete: Demo users and food items added');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();