require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('express-favicon');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(routes);

app.use('*', (req, res) => {
	return res.render('error');
});

app.listen(process.env.PORT || 3000);
