const express = require('express');
const {
  login,
  register,
  getCurrentUser,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/current', getCurrentUser);

module.exports = router;
