import { Request, Response, Router } from "express";

const isAuthenticated = require('../../../auth/user-auth');

// TODO: Add logger
const router = Router();

router.get('/', isAuthenticated, (req: Request, res: Response) => {
    res.render('dashboard', {
        title: 'Dashboard'
    });
});

export default { router };