const express = require('express');
const router = express.Router();

let Event = require('../models/event');

router.get('/add', (req, res) => {
    res.render('add_event', {
        title: 'Add an event'
    });
});

router.post('/add', (req, res) => {
    let event = new Event();
    event.title = req.body.title;
    event.date = req.body.date;
    event.location = req.body.location;
    event.description = req.body.description;
    event.image = 'image';

    event.save(() => {
        res.redirect('/');
    });
});

module.exports = router;