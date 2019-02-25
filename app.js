const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log(err);
});

const app = express();

let Event = require('./models/event');

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



app.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                events: events
            });
        }
    });
    
});
let about = require('./routes/about');
app.use('/', about);

let events = require('./routes/events');
app.use('/events', events);

let sponsors = require('./routes/sponsors');
app.use('/', sponsors);

app.listen(1337, () => {
    console.log('Listening on port 1337...');
});