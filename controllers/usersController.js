const asyncHandler = require('express-async-handler');

// @ Register a user (POST /api/users/register) [public]
const register = asyncHandler(async (req, res) => {
  res.json({ success: true, msg: 'Register' });
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
