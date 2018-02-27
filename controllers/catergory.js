const Category = require('../models/category');
const Blog = require('../models/blog');

function newRoute(req, res) {
  Category.find()
    .then(categories => res.render('blogs/new', { categories }));
}

function editRoute(req, res) {
  // get both blogs and categories in parallel
  Promise.props({
    blog: Blog.findById(req.params.id),
    categories: Category.find()
  })
    .then(data => res.render('blogs/edit', data)); // inject the data into the view
}

module.exports = {
  new: newRoute,
  edit: editRoute
};
