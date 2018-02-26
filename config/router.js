const router = require('express').Router();
const blogs = require('../controllers/blogs');
const blog = require('../db/data/blog');

// request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.route('/blogs')
  .get(blogs.index)
  .post(blogs.create);

router.route('/blogs/new')
  .get(blogs.new);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
