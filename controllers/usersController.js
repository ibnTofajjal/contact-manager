const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @ Register a user (POST /api/users/register) [public]
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data us not valid');
  }
  res.json({ message: 'Register the user' });
});

// @ Login a user (POST /api/users/login) [public]
const login = asyncHandler(async (req, res) => {
  res.json({ success: true, msg: 'Login' });
});

// @ Get current user (GET /api/users/current) [private]
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ success: true, msg: 'GetCurrentUser' });
});

module.exports = {
  register,
  login,
  getCurrentUser,
};
