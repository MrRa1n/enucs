const express = require('express');
const router = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/events/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});

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

router.post('/add', upload.single('image'), (req, res, next) => {

    if (req.file) {
        console.log(req.file.filename);
    } else {
        console.log('No File Uploaded');
    }

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

    if (req.body.title.length > 30 ||
        !req.body.date.match(/^(\s*(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s*)?(0?[1-9]|[1-2][0-9]|3[01])\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(19[0-9]{2}|[2-9][0-9]{3}|[0-9]{2})/g)) {
            console.log('Date is fucked mate');
            return;
        }

    let event = new Event();
    event.title = req.body.title;
    event.location = req.body.location;
    event.date = req.body.date;
    event.start = req.body.start;
    event.end = req.body.end;
    event.description = req.body.description;
    event.image = req.file.filename;

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