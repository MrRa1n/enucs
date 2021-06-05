import { Request, Response, Router } from 'express';
import CommitteeMember from '../../../models/committee-member';
import Database from "../../../database/database";
import { logger } from '../../../utils/logger';

const isAuthenticated = require('../../../auth/user-auth');

const router = Router();
const db = new Database();

/**
 * TODO:
 *  - POST for adding single member
 *  - PUT for updating existing member
 *  - DELETE for removing member
 * 
 * A good constraint to add would be to only allow members to be added for the maximum
 * number of committee roles available. Would involve creating a separate table for
 * committee roles.
 */

/**
 * Date formatter
 * Credit - https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
 */
function join(t: Date, a: any[], s: string) {
    function format(m: any) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}
 
router.get('/admin/committee', isAuthenticated, (req: Request, res: Response) => {
    logger.info(`[${req.method}] - ${req.path} - Fetching committee members`);
    const dateFormat = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];

    db.getCommittee().then((committee: CommitteeMember[]) => {
        committee.map(member =>
            member.member_since = join(new Date(member.member_since), dateFormat, ' '));
        res.render('committee', {
            title: 'Committee',
            committee: committee
        });
    })
    .catch(err => {
        logger.error('Failed to retrieve committee members', err);
        res.status(500).send(err);
    });
});

export default { router };