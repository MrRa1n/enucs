#!/usr/bin/env nodejs

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const database = require('./database/database');
const logger = require('morgan');
const token = require('./config/bearerToken');
const axios = require('axios');
const log4js = require('log4js');
const app = express();

const db = new database.Database();

/** Configuration for logger. */
log4js.configure({
    appenders: { 
        errors: { type: 'file', filename: 'enucs.log' },
        console: { type: 'console' }
    },
    categories: { default: { appenders: ['console'], level: 'all' } }
});

/** The logger. */
const LOGGER = log4js.getLogger('default');

/** Logger for HTTP requests. */
app.use(logger('dev'));
/** application/x-www-form-urlencoded. */
app.use(bodyParser.urlencoded({ extended: false }));
/** Handles parsing for JSON data. */
app.use(bodyParser.json());
/** Set directory for static files. */
app.use(express.static(path.join(__dirname, 'public')));
/** Set the view template path. */
app.set('views', path.join(__dirname, 'views'));
/** Set view engine. */
app.set('view engine', 'pug');
// Express Validator Middleware
app.use(expressValidator());

/** Index page */
app.get('/', (_req, res) => {
    LOGGER.info('Fetching tweets...');
    let tweets = [];
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
        +'?screen_name=enucs&exclude_replies=true&include_rts=false&count=3';
    const bearerToken = 'bearer ' + token.bearerToken();
    const instance = axios({ url: url, headers: { 'Authorization': bearerToken } });
    instance
        .then((res) => {
            res.data.forEach(tweet => {
                let retrievedTweet = {
                    body: tweet.text,
                    created_at: new Date(tweet.created_at)
                        .toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
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
const about = require('./routes/about/about');
app.use('/about', about);

/** Events */
const events = require('./routes/events/events');
app.use('/events', events);

/** Sponsors */
const partners = require('./routes/partners/partners');
app.use('/partners', partners);

/** Merchandise */
const merch = require('./routes/merch/merch');
app.use('/merch', merch);

/** Join Us */
const join = require('./routes/join/join');
app.use('/join', join);

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});