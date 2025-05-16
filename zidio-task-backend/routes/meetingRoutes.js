const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// POST /api/meeting/start
router.post('/start', async (req, res) => {
  const { meetingId, host } = req.body;
  try {
    const newMeeting = new Meeting({ meetingId, host });
    await newMeeting.save();
    res.status(201).json({ message: 'Meeting created', meetingId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create meeting', error: err.message });
  }
});

module.exports = router;
