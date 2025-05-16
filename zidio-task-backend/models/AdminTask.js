const mongoose = require('mongoose');

const AdminTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminTask', AdminTaskSchema);
