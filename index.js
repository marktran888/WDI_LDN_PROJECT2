const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser'); // makes sense of form data i.e. allows use to use req.body
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const router = require('./config/router');
const userAuth = require('./lib/userAuth');
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/blogger-app');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

//setup body bodyParser MUST BE BEFORE ROUTER
app.use(bodyParser.urlencoded({ extended: true }));

// setup method-override
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: '298rv^72e34s5t3(', // a random key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(userAuth);

app.use(router); // MUST BE PLACED JUST BEFORE app.listen


//set up a global error catcher
app.use((err, req, res, next) => { //eslint-disable-line
  console.log(err);
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err });
});

// app.listen should always be the last line in this file
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
