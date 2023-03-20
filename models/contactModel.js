const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
