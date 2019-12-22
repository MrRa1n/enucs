#!/usr/bin/env nodejs

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const db = require('./database/database');
const logger = require('morgan');
const token = require('./config/bearerToken');
const axios = require('axios');
const log4js = require('log4js');

const app = express();

log4js.configure({
    appenders: { errors: { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['errors'], level: 'error' } }
});

const LOGGER = log4js.getLogger('errors');

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
    LOGGER.info('/');
    let tweets = [];
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=enucs&exclude_replies=true&include_rts=false&count=3';
    const bearerToken = 'bearer ' + token.bearerToken();
    const instance = axios({url: url, headers: { 'Authorization': bearerToken }});
    instance
        .then((res) => {
            res.data.forEach(tweet => {
                let retrievedTweet = { 
                    body: tweet.text, 
                    created_at: new Date(tweet.created_at).toLocaleString('en-GB', { 
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}), 
                    handle: tweet.user.screen_name 
                }
                tweets.push(retrievedTweet);
            });
        })
        .then(() => {
            db.getFutureEvents(6, (err, rows) => {
                rows = rows.map((row) => {
                    if(row.start_time.toDateString() != row.end_time.toDateString()) {
                        row.start_time = row.start_time.toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
        
                        row.end_time = row.end_time.toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
        
                    } else {
                        row.date = row.start_time.toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        });
        
                        row.start_time = row.start_time.toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
        
                        row.end_time = row.end_time.toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }   
                    return row;
                });

                res.render('index', {
                    events: err ? null : rows,
                    tweets: tweets
                });
            });    
        })
        .catch((err) => {
            console.log(err);
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


app.listen(3000, () => {
    console.log('Listening on port 3000...');
});