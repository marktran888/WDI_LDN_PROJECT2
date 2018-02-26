const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

commentSchema.methods.isOwnedBy = function(user){
  return this.user && user._id.equals(this.user._id); //this is the comment
};


const schema = new mongoose.Schema({
  title: { type: String, required: true},
  blogger: { type: String, required: true},
  image: { type: String, pattern: /^https?:\/\/.+/ },
  description: { type: String, required: true},
  article: { type: String, required: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Blog', schema);
