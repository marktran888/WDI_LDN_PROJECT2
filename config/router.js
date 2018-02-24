const router = require('express').Router();
const blog = require('../data/blog');

router.get('/blog', (req, res) => res.render('pages/blog', { data: blog }));

router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/contact', (req, res) => res.render('pages/contact'));

module.exports = router;
