import { Request, Response, Router } from 'express';
const isAuthenticated = require('../../../auth/user-auth');

const router = Router();

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

router.get('/admin/committee', isAuthenticated, (req: Request, res: Response) => {

    // TODO: Fetch committee members from database

    res.render('committee', {
        title: 'Committee'
    });
});

export default { router };