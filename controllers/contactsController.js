const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');

//@desc     Get all contacts
//@route    GET /api/contacts
//@access   PRIVATE

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contacts.find({});

  if (!contact) {
    return res.status(404).json({ success: false, msg: 'Contact not found' });
  }

  res.status(200).json({ success: true, data: contact });
});

//@desc     Get single contact
//@route    GET /api/contacts/:id
//@access   PRIVATE

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ user_id: req.user.id });

  res.status(200).json({ success: true, data: contacts });
});

//@desc     Create new contact
//@route    POST /api/contacts
//@access   Private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newContact = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(200).json({ success: true, data: newContact });
  console.log('newContact: ', newContact);
});

//@desc     Update contact
//@route    PUT /api/contacts/:id
//@access   Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ success: false, msg: 'Contact not found' });
  }

  if (contact.user_id.toString() !== req.user.id) {
    return res.status(401).json({ success: false, msg: 'Not authorized' });
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: updatedContact });
});

//@desc     Delete contact
//@route    DELETE /api/contacts/:id
//@access   Private

const deleteContact = asyncHandler(async (req, res) => {
  // delete one contact
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ success: false, msg: 'Contact not found' });
  }
  if (contact.user_id.toString() !== req.user.id) {
    return res.status(401).json({ success: false, msg: 'Not authorized' });
  }

  const deletedContact = await Contacts.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, data: deletedContact, msg: 'Contact deleted' });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
