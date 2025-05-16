const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  meetingId: { type: String, required: true, unique: true },
  host: { type: String, required: true }, // email or username
  participants: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meeting', MeetingSchema);
