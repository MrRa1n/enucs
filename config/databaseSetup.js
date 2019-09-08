const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/enucs.db');

/** Create tables for database */
exports.init = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS Users (userID INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS Events (eventID INTEGER PRIMARY KEY, title TEXT, date DATE, start TEXT, end TEXT, location TEXT)');
    });
}

exports.getEvents = (callback) => {
    db.all('SELECT title, date, start, end, location FROM Events ORDER BY date', (err, rows) => {
        callback(err, rows);
    });
}

exports.getFutureEvents = (limit, callback) => {
    db.all("SELECT title, date, start, end, location FROM Events WHERE date >= DATE('now') ORDER BY date LIMIT ?", limit, (err, rows) => {
        callback(err, rows);
    });
}

module.exports = exports;
