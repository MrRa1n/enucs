const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/enucs.db');

/** Create tables for database */
exports.init = () => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (userid INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT);');
    });
}

module.exports = exports;
