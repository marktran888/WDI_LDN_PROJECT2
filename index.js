const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('pages/home'));

// app.listen should always be the last line in this file
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
