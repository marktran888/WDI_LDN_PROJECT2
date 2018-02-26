const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true},
  blogger: { type: String, required: true},
  image: { type: String, pattern: /^https?:\/\/.+/ },
  description: { type: String, required: true},
  article: { type: String, required: true } 
});

module.exports = mongoose.model('Blog', schema);
