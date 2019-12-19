const express = require('express');
const router = express.Router();
const multer  = require('multer');
const db = require('../config/databaseSetup');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/events/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

/** 
 * GET mapping for base URL of Events page
 * Fetches list of events from database
 */
router.get('/', (req, res) => {
    db.getEvents((err, rows) => {
        rows = rows.map((row) => {
            row.date = new Date(row.date)
                .toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
            return row;
        });
        res.render('events', {
            title: 'Events',
            events: err ? null : rows
        });
    })
});

/** 
 * GET mapping for adding new event
 * TODO: Implement functionality to render page
 */
router.get('/add', (req, res) => {
    res.status(403);
    res.send('Forbidden!');
    return;
});

/** 
 * POST mapping for adding new event
 * TODO: Implement functionality for adding event
 */
router.post('/add', upload.single('image'), (req, res, next) => {
    res.status(403);
    res.send('Forbidden!');
    return;
});

/**
 * GET mapping for individual event page
 */
router.get('/:id', (req, res) => {
    res.render('event_page', {
        event: null
    });
});

module.exports = router;
