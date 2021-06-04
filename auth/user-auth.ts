import Database from '..../../../database/database';
import cookie from 'cookie';

const db = new Database();

module.exports = async (req: any, res: any, next: Function) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionId = cookies.SESSIONID;

    if (req.app.locals.userid) {
        const retrievedSessionId: any = await db.getSessionId(req.app.locals.userid);
        if (sessionId !== retrievedSessionId.sessionid) {
            console.log(retrievedSessionId);
            req.app.locals.authorised = false;
            res.redirect('/admin/login');
        }
        return next();
    }

    res.redirect('/admin/login');
};