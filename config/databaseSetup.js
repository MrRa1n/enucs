const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/enucs.db');

/** Create tables for database */
exports.init = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (userID INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT);');
        db.run('CREATE TABLE IF NOT EXISTS events (eventID INTEGER PRIMARY KEY, title TEXT, date TEXT, start TEXT, end TEXT, location TEXT);');
    });
}

module.exports = exports;
