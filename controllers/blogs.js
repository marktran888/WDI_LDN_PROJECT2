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

function showRoute(req, res, next) {
  Blog.findById(req.params.id)
    .then(blog => {
      if(!blog) return res.render('pages/404');
      res.render('blogs/show', { blog });
    })
    .catch(next);
}

function editRoute(req, res){
  Blog.findById(req.params.id)
    .then(blog => res.render('blogs/edit', { blog }));
}

function updateRoute(req, res){
  Blog.findById(req.params.id)
    .then(blog => Object.assign(blog, req.body))
    .then(blog => blog.save())
    .then(() => res.redirect(`/blogs/${req.params.id}`));
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
