const express = require('express');
const router = express.Router();
const {
  createEvent,
  inviteUser,
  updateEvent,
} = require('../controllers/eventController');

router.post('/event', createEvent);
router.post('/events/invite', inviteUser);
router.put('/update/:eventId', updateEvent);

module.exports = router;
