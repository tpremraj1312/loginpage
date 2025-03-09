import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js'; // Add .js extension
import User from '../backend/models/User.js';

dotenv.config();
const app = express();

app.use(express.json());  // Allow JSON requests
app.use(cors());  // Enable CORS

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema

// const User = mongoose.model("User", UserSchema);

// Login API
// const express = require('express');
const router = express.Router();
// const User = require('../models/User'); // Assuming you have a User model
// const authRoutes=require('./routes/authRoutes');
app.use('/api', authRoutes);
// Login API
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Validate password (assuming you're using bcrypt for hashing)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Signup API
router.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password (using bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Start Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
export default router;