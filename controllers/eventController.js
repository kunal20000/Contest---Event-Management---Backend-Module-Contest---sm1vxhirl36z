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
     const { name, date } = req.body;

    // Assuming that you have a user ID from the decoded JWT token
    const creatorId = req.user._id;

    const newEvent = new Event({
      name,
      date,
      creator: creatorId,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Inviting Users to a Event
const inviteUser = async (req, res) => {
  try {
    //Write a logic to invite a user
    const { eventId, inviteeId } = req.body;

    // Assuming you have the creator's ID from the decoded JWT token
    const creatorId = req.user._id;

    const newInvitee = new Invitee({
      eventId,
      creator: creatorId,
      invitee: inviteeId,
    });

    const savedInvitee = await newInvitee.save();

    res.status(201).json(savedInvitee);
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
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: { name, date } },
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { createEvent, inviteUser, updateEvent };
