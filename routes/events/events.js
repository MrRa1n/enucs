const express = require('express');
const router = express.Router();
const database = require('../../database/database');

const db = new database.Database();

/** 
 * GET mapping for base URL of Events page
 * Fetches list of events from database
 */
router.get('/', (req, res) => {
    db.getEvents().then(events => {
        events = events.map(event => event.prettifyDates());

        res.render('events', {
            title: 'Events',
            events: events
        });
    });
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
router.post('/add', (req, res, next) => {
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
