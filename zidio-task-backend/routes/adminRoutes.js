const express = require('express');
const AdminTask = require('../models/AdminTask');
const AdminMeeting = require('../models/AdminMeeting');
const router = express.Router();

// POST /admin/task
router.post('/task', async (req, res) => {
  try {
    const newTask = await AdminTask.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create task' });
  }
});

// POST /admin/meeting
router.post('/meeting', async (req, res) => {
  try {
    const newMeeting = await AdminMeeting.create(req.body);
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create meeting' });
  }
});

module.exports = router;
