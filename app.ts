#!/usr/bin/env nodejs

import express, { Request, Response } from "express";
import path from 'path';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import logger from 'morgan';
import axios, {AxiosResponse} from 'axios';
import log4js from 'log4js';
import fs from 'fs';

import Database from './database/database';

const app = express();
const db = new Database();
const tokens = JSON.parse(fs.readFileSync('config/tokens.json', 'utf8'));

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
app.get('/', async (req: Request, res: Response) => {
    LOGGER.info('Fetching tweets...');
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
        +'?screen_name=enucs&exclude_replies=true&include_rts=false&count=3';
    const bearerToken = 'bearer ' + tokens.twitter;
    const instance = await axios({ url: url, headers: { 'Authorization': bearerToken } });

    let tweets = instance.data.map((tweet: any) => {
        return {
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
        };
    });

    let events = await db.getFutureEvents(6);

    res.render('index', {
        events: events.map(event => event.prettifyDates()),
        tweets: tweets
    });
});

/** About Us */
import about from './routes/about/about';
app.use('/about', about.router);

/** Events */
import events from './routes/events/events';
app.use('/events', events.router);

/** Sponsors */
import partners from './routes/partners/partners';
app.use('/partners', partners.router);

/** Merchandise */
import merch from './routes/merch/merch';
app.use('/merch', merch.router);

/** Join Us */
import join from './routes/join/join';
app.use('/join', join.router);

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
