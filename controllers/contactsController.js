const express = require('express');
const asyncHandler = require('express-async-handler');

//@desc     Get all contacts
//@route    GET /api/contacts
//@access   Public

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all contacts' });
});

//@desc     Get single contact
//@route    GET /api/contacts/:id
//@access   Public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, msg: `Show contact ${req.params.id}` });
});

//@desc     Create new contact
//@route    POST /api/contacts
//@access   Private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  res.status(200).json({ success: true, msg: 'Create new contact' });
});

//@desc     Update contact
//@route    PUT /api/contacts/:id
//@access   Private

const updateContact = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update contact ${req.params.id}` });
});

//@desc     Delete contact
//@route    DELETE /api/contacts/:id
//@access   Private

const deleteContact = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
