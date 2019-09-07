const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/enucs.db');

/** Create tables for database */
exports.init = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS Users (userID INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS Events (eventID INTEGER PRIMARY KEY, title TEXT, date TEXT, start TEXT, end TEXT, location TEXT)');
    });
}

exports.getEvents = (callback, config) => {
    //Allow this function to work with and without this parameter
    if(config) {
        return undefined;

    } else {
        db.all('SELECT title, date, start, end, location FROM Events', (err, rows) => {
            callback(err, rows);
        });
    }
}

module.exports = exports;
