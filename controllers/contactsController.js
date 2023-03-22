const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');

//@desc     Get all contacts
//@route    GET /api/contacts
//@access   PRIVATE

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();

  res.status(200).json({ success: true, data: contacts });
});

//@desc     Get single contact
//@route    GET /api/contacts/:id
//@access   PRIVATE

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ success: false, msg: 'Contact not found' });
  }

  res.status(200).json({ success: true, data: contact });
});

//@desc     Create new contact
//@route    POST /api/contacts
//@access   Private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newContact = await Contacts.create({
    name,
    email,
    phone,
  });

  res.status(200).json({ success: true, data: newContact });
});

//@desc     Update contact
//@route    PUT /api/contacts/:id
//@access   Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ success: false, msg: 'Contact not found' });
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
