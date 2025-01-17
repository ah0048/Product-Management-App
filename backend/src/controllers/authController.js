const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  };

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      status: 'fail', 
      data: {
        message: "User already exists"
      } 
    });
  }

  // Create new user
  const user = await User.create({ firstName, lastName, email, password });

  if (user) {
    res.status(201).json({
      status: 'success', 
      data: {
        message: "User created successfully",
        token: generateToken(user._id),
      }
    });
  } else {
    return res.status(400).json({
      status: 'fail', 
      data: {
        message: "Invalid user data"
      } 
    });
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 'success', 
      data: {
        message: "User logined successfully",
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(401).json({ 
      status: 'fail', 
      data: {
        message: "Invalid email or password"
      }
    });
  }
});

module.exports = { registerUser, loginUser };
