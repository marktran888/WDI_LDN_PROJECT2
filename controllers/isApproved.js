const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  isApproved: { type: Boolean, required: true }
});

module.exports = mongoose.model('Category', schema);
