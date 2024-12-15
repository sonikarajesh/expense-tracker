const express = require("express");
const User = require("../models/User"); 
const router = express.Router();



router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const newUser = new User({
      email,
      password, 
      name,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      user: { email: newUser.email, name: newUser.name, userId: newUser._id }, 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "User registration failed",
    });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { email: user.email, name: user.name, userId: user._id },  
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Login failed",
    });
  }
});

module.exports = router;
