import bcrypt from 'bcrypt';
import cookie from 'cookie';
import crypto from 'crypto-random-string';
import { Request, Response, Router } from "express";
import Database from "../../../database/database";
import { logger } from '../../../utils/logger';

const router = Router();
const db = new Database();

router.get('/admin/login', (req: Request, res: Response) => {
    logger.info(`[${req.method}] - ${req.path}`);
    res.render('login', {
        title: 'Login'
    });
});

router.post('/admin/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    logger.info(`[${req.method}] - ${req.path} - Logging in user`, username);

    db.getUser(username).then(user => {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) {
                logger.error(`Error when checking password for ${user.username}`, err);
                throw err;
            } else if (!same) {
                logger.error(`Login failed for user ${user.username} - Password incorrect!`);
                throw new Error('Passwords do not match!');
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
                    .then(() => {
                        logger.info(`User ${user.username} logged in successfully`);
                        res.redirect('/admin/dashboard');
                    })
                    .catch(err => {
                        logger.error(`Failed to set session ID for ${user.username}`);
                        res.status(500).send(err)
                    });
            }
        });
    }, err => {
        logger.error(`Error when fetching user ${username}`, err);
        return;
    })
});

router.get('/admin/logout', (req: Request, res: Response) => {
    logger.info(`[${req.method}] - ${req.path} - Logging out user`, req.app.locals.user);
    db.getSessionId(req.app.locals.userid).then((sessionId: string) => {
        res.setHeader('Set-Cookie', cookie.serialize('SESSIONID', sessionId, {
            maxAge: 0,
            httpOnly: true,
            path: '/',
            sameSite: 'strict'
        }));
    })
    .then(() => {
        logger.info(`User ${req.app.locals.user} logged out successfully`);
        req.app.locals.authorised = false;
        res.redirect('/admin/login');
    })
    .catch(err => {
        logger.error(`Failed to logout user ${req.app.locals.user}`, err);
        res.status(500).send(err);
    });
});

export default { router };