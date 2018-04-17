const mongoose = require('mongoose');
const marked = require('marked');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  isModerated: { type: Boolean, default: false }
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
  comments: [ commentSchema ],

  category: { type: mongoose.Schema.ObjectId, ref: 'Category' }
  // category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true }
});

schema.virtual('articleHTML')
  .get(function() {
    return marked(this.article);
  });

module.exports = mongoose.model('Blog', schema);
