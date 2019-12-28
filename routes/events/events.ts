import { Router, Request, Response } from "express";

import Database from "../../database/database";

const router = Router();
const db = new Database();

/**
 * GET mapping for base URL of Events page
 * Fetches list of events from database
 */
router.get('/', async (req: Request, res: Response) => {
    let current = await db.getCurrentYearTerm();
    let events = await db.getEventsFor(current.year_id, current.term_id);

    res.render('events', {
        events: events.map(event => event.prettifyDates())
    });
});

router.get('/:year(\\d{2}-\\d{2})/:term(tr[1-3])', async (req: Request, res: Response) => {
    let year = await db.getYear(req.params.year);
    let term = await db.getTerm(req.params.term);

    //Term cannot be incorrect so only validate year
    if(year === undefined) {
        res.redirect('/events');

    } else {
        let events = await db.getEventsFor(year.id, term.id);

        res.render('events', {
            events: events.map(event => event.prettifyDates())
        });
    }
});

export default { router };
