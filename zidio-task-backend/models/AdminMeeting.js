const mongoose = require('mongoose');

const AdminMeetingSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminMeeting', AdminMeetingSchema);
