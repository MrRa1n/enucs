import Database from "../../../database/database";
import e, { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';

// TODO: Add logger

const router = Router();
const db = new Database();

router.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/', (req: Request, res: Response) => {
    // TODO: Add input user to fetch
    db.getUser('').then(user => {
        // TODO: Add input password to compare
        bcrypt.compare('', user.password, (err, same) => {
            if (err) {
                throw err;
            } else if (!same) {
                throw new Error('Passwords do not match!');
            } else {
                // TODO: Set SESSIONID in cookie, update in database
                // TODO: Redirect to dashboard
            }
        });
    }, err => {
        
    })
});

export default { router };