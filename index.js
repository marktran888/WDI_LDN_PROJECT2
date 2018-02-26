const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser'); // makes sense of form data i.e. allows use to use req.body
const router = require('./config/router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogger-app');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

//setup body bodyParser MUST BE BEFORE ROUTER
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('pages/home'));

app.use(router); // MUST BE PLACED JUST BEFORE app.listen

// app.listen should always be the last line in this file
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
