const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const matchRoutes = require('./routes/match');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Modern async/await connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/match', matchRoutes);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ Fallback route for SPA or direct navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));