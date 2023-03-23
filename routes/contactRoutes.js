const express = require('express');

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactsController');
const tokenValidator = require('../middleware/tokenValidator');

router.use(tokenValidator);
router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/createContact', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
