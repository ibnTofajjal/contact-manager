const express = require('express');
const {
  login,
  register,
  getCurrentUser,
  getAllUser,
} = require('../controllers/usersController');
const tokenValidator = require('../middleware/tokenValidator');

const router = express.Router();

router.get('/', tokenValidator, getAllUser);

router.post('/login', login);

router.post('/register', register);

router.get('/current', tokenValidator, getCurrentUser);

module.exports = router;
