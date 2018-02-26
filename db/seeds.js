const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Blog = require('../models/blog');
const blogData = require('./data/blog');

mongoose.connect('mongodb://localhost/blogger-app', (err,db) => {
  db.dropDatabase();

  // create blog then console log, if rejected catch errs and then close not matter what
  Blog.create(blogData)
    .then(blogs => console.log(`${blogs.length} blogs created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
