const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({ success: true, msg: 'Login' });
});

// @ Get current user (GET /api/users/current) [private]
const getCurrentUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ success: true, msg: 'GetCurrentUser', data: users });
});

module.exports = {
  register,
  login,
  getCurrentUser,
};
