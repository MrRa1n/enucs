import { Router, Request, Response } from "express";

import Database from "../../database/database";

const router = Router();
const db = new Database();

/**
 * GET mapping for base URL of Events page
 * Fetches list of events from database
 */
router.get('/', (req: Request, res: Response) => {
    db.getEvents().then(events => {
        let displayableEvents = events.map(event => event.prettifyDates());

        res.render('events', {
            title: 'Events',
            events: displayableEvents
        });
    });
});

router.get('/:year(\\d{2}-\\d{2})/:term(tr\\d)', (req: Request, res: Response) => {
    res.render('events', {
        title: 'Events',
        events: []
    });
});

export default { router };
