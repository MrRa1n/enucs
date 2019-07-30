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

router.get('/', (req, res) => {
    res.render('events', {
        title: 'Events',
        events: null
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
});

router.get('/:id', (req, res) => {
    res.render('event_page', {
        event: null
    });
});

module.exports = router;