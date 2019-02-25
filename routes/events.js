const express = require('express');
const router = express.Router();

let Event = require('../models/event');

router.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.render('events', {
                title: 'Events',
                events: events
            });
        }
    });
    
});

router.get('/add', (req, res) => {
    res.render('add_event', {
        title: 'Add an event'
    });
});

router.post('/add', (req, res) => {
    console.log(req.body);
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('location', 'Location is required').notEmpty();
    req.checkBody('date', 'Date is required').notEmpty();
    req.checkBody('start', 'Start time is required').notEmpty();
    req.checkBody('end', 'End time is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    let errors = req.validationErrors();
    
    if (errors) {
        console.log(errors);
        return;
    }

    let event = new Event();
    event.title = req.body.title;
    event.location = req.body.location;
    event.date = req.body.date;
    event.start = req.body.start;
    event.end = req.body.end;
    event.description = req.body.description;

    event.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;