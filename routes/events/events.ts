import { Router, Request, Response } from "express";

import Database from "../../database/database";

const router = Router();
const db = new Database();

/**
 * GET mapping for base URL of Events page
 * Fetches list of events from database
 */
router.get('/', (req: Request, res: Response) => {
    db.getCurrentYearTerm().then(current => {
        db.getEventsFor(current.year_id, current.term_id).then(events => {
            let displayableEvents = events.map(event => event.prettifyDates());
    
            res.render('events', {
                title: 'Events',
                events: displayableEvents
            });
        });
    });
});

router.get('/:year(\\d{2}-\\d{2})/:term(tr[1-3])', (req: Request, res: Response) => {
    let yearPromise = db.getYear(req.params.year);
    let termPromise = db.getTerm(req.params.term);

    Promise.all([yearPromise, termPromise]).then(values => {
        let year = values[0];
        let term = values[1];

        //Term cannot be incorrect so only validate year
        if(year === undefined) {
            res.redirect('/events');

        } else {
            db.getEventsFor(year.id, term.id).then(events => {
                let displayableEvents = events.map(event => event.prettifyDates());

                res.render('events', {
                    events: displayableEvents
                });
            });
        }
    });
});

export default { router };
