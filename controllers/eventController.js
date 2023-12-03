const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const Invitee = require('../models/eventInviteeMapping');
const jwt = require('jsonwebtoken');

//Creating a new Event
const createEvent = async (req, res) => {
  try {
    //Write a logic for createEvent
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Inviting Users to a Event
const inviteUser = async (req, res) => {
  try {
    //Write a logic to invite a user
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  try {
    //Write a logic to update name and date of a event
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { createEvent, inviteUser, updateEvent };
