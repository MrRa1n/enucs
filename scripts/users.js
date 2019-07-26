const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/enucs.db');

/** Logic for handling user registration */
exports.register = (name, email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    db.run('INSERT INTO users VALUES (?, ?, ?)', name, email, hash);
                    resolve();
                }
            });
        });        
    });
}