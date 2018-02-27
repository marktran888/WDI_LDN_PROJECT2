const Blog = require('../models/blog');
const Category = require('../models/category');
const Promise = require('bluebird');

function indexRoute(req, res) {
  Promise.props({
    categories: Category.find().exec(),
    blogs: Blog.find(req.query).exec()
  })
    .then(data => {
      res.render('blogs/index', {
        blogs: data.blogs,
        categories: data.categories,
        selectedCategory: req.query.category
      });
    });
}

// function filterRoute(req, res) {
//   console.log(req.query);
//   Blog.find(req.query)
//     .then(blogs => res.render('blogs/index', { blogs }));
//
//   // const selection = req.body.category;
//   // Blog.find()
//   //   .populate('category')
//   //   .then(category)
// }

function newRoute(req, res){
  Category.find()
    .then(categories => res.render('blogs/new', { categories }));
  // res.render('blogs/new');
}

function createRoute(req,res, next){
  console.log(req.body);

  Blog.create(req.body) //req.body is from body-parser
    .then(() => res.redirect('/blogs'))
    .catch(next);
}

function showRoute(req, res, next) {
  Blog.findById(req.params.id)
    .populate('comments.user') // populate with object info
    .populate('category')
    .then(blog => {
      if(!blog) return res.render('pages/404');
      res.render('blogs/show', { blog });
    })
    .catch(next);
}


// function editRoute(req, res){
//   Blog.findById(req.params.id)
//     .then(blog => res.render('blogs/edit', { blog }));
// }

function editRoute(req, res) {
  // get both blogs and categories in parallel
  Promise.props({
    blog: Blog.findById(req.params.id),
    categories: Category.find()
  })
    .then(data => res.render('blogs/edit', data)); // inject the data into the view
}

function updateRoute(req, res){
  Blog.findById(req.params.id)
    .then(blog => Object.assign(blog, req.body))
    .then(blog => blog.save())
    .then(() => res.redirect(`/blogs/${req.params.id}`));
}

function deleteRoute(req, res){
  Blog.findById(req.params.id)
    .then(blog => blog.remove())
    .then(() => res.redirect('/blogs'));
}

function commentsCreateRoute(req, res, next){
  req.body.user = req.currentUser;

  Blog.findById(req.params.id)
    .then(blog => {
      blog.comments.push(req.body);
      return blog.save();
    })
    .then(blog => res.redirect(`/blogs/${blog._id}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next){
  Blog.findById(req.params.id)
    .then(blog => {
      const comment = blog.comments.id(req.params.commentId);
      comment.remove();
      return blog.save();
    })
    .then(blog => res.redirect(`/blogs/${blog._id}`))
    .catch(next);
}

function moderate(req, res, next) {
  if(!req.currentUser.isAdmin){
    req.flash('You do not have permisision to moderate');
    return res.redirect(`/blogs/${req.params.id}`);
  }

  Blog.findById(req.params.id)
    .then(blog => {
      const comment = blog.comments.id(req.params.commentId);
      comment.isModerated = true;
      return blog.save();
    })
    .then(blog => res.redirect(`/blogs/${blog._id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  commentsModerate: moderate
  // filter: filterRoute
};
