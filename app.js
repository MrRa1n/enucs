#!/usr/bin/env nodejs

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const db = require('./config/databaseSetup');
const logger = require('morgan');

const app = express();

db.init();

/** Logger for HTTP requests */
app.use(logger('dev'));

// Body Parser Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Set public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup pug view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express Validator Middleware
app.use(expressValidator());

/** Index page */
// TODO: Add query to fetch most recent upcoming events
app.get('/', (req, res) => {
    res.render('index', {
        events: null
    });
});

/** About Us */
const about = require('./routes/about');
app.use('/about', about);

/** Events */
const events = require('./routes/events');
app.use('/events', events);

/** Sponsors */
const partners = require('./routes/partners');
app.use('/partners', partners);

/** Merchandise */
const merch = require('./routes/merch');
app.use('/merch', merch);

/** Join Us */
const join = require('./routes/join');
app.use('/join', join);

/** Users */
const users = require('./routes/users');
app.use('/users', users);

app.listen(1337, () => {
    console.log('Listening on port 1337...');
});