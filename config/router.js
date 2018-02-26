const router = require('express').Router();
const blogs = require('../controllers/blogs');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

// request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.route('/blogs/new')
  .get(secureRoute, blogs.new);

router.route('/blogs')
  .get(blogs.index)
  .post(secureRoute, blogs.create);


router.route('/blogs/:id')
  .get(blogs.show)
  .put(secureRoute, blogs.update)
  .delete(secureRoute, blogs.delete);

router.route('/blogs/:id/edit')
  .get(secureRoute, blogs.edit);

router.route('/blogs/:id/comments')
  .post(secureRoute, blogs.commentsCreate);

router.route('/blogs/:id/comments/:commentId')
  .delete(secureRoute, blogs.commentsDelete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
