import bcrypt from 'bcrypt';
import cookie from 'cookie';
import crypto from 'crypto-random-string';
import { Request, Response, Router } from "express";
import Database from "../../../database/database";

// TODO: Add logger

const router = Router();
const db = new Database();

router.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log({ username, password });

    db.getUser(username).then(user => {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) {
                throw err;
            } else if (!same) {
                throw new Error('Password is incorrect!');
            } else {
                req.app.locals.userid = user.userid;
                req.app.locals.user = username;
                req.app.locals.authorised = true;

                const sessionId = crypto(32);

                res.setHeader('Set-Cookie', cookie.serialize('SESSIONID', sessionId, {
                    maxAge: 3600,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict'
                }));

                db.setSessionId(sessionId, user.userid)
                    .then(() => res.redirect('/admin/dashboard'))
                    .catch(err => {
                        console.error(err);
                        res.status(500).send(err)
                    });
            }
        });
    }, err => {
        console.error(err);
    })
});

export default { router };