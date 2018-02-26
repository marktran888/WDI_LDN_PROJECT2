const Blog = require('../models/blog');

function indexRoute(req, res) {
  //Use Blog model to get the data from the database
  Blog.find()
    .then(blogs => res.render('blogs/index', { blogs: blogs }));
}

function newRoute(req, res){
  res.render('blogs/new');
}

function createRoute(req,res, next){
  console.log(req.body);

  Blog.create(req.body) //req.body is from body-parser
    .then(() => res.redirect('/blogs'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute
};
