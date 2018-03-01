const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Blog = require('../models/blog');
const blogData = require('./data/blog');
const User = require('../models/user');
const userData = require('./data/user');
const Category = require('../models/category');
const categoryData = require('./data/category');

// mongoose.connect('mongodb://localhost/blogger-app', (err,db) => {
//   db.dropDatabase();
//
// // create blog then console log, if rejected catch errs and then close not matter what
// Blog.create(blogData)
//   .then(blogs => console.log(`${blogs.length} blogs created`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
// User.create(userData)
//   .then(users => console.log(users))
//   .catch(console.log(err))
//   .finally(() => mongoose.connection.close());
//   Category.create(categoryData)
//     .then(cat => console.log(cat))
//     .catch(console.log(err))
//     .finally(() => mongoose.connection.close());
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blogger-app', (err, db) => {
  db.dropDatabase();

  Category.create(categoryData)
    .then(categories => {
      console.log(`${categories.length} categories created`);

      blogData[0].category = categories[0];
      blogData[1].category = categories[1];

      return Blog.create(blogData);
    })
    .then(blogs => {
      console.log(`${blogs.length} blogs created`);
      return User.create(userData);
    })
    .then(users => console.log(`${users.length} users created`))
    .catch(console.log(err))
    .finally(() => mongoose.connection.close());

});
