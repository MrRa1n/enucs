const bcrypt = require('bcryptjs');
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
                    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', name, email, hash);
                    resolve();
                }
            });
        });        
    });
}

/** Logic for handling user login */
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
            if (err) reject(err);
            if (row == null) reject('No account found');
            if (row != null) {
                bcrypt.compare(password, row.password, (err, same) => {
                    if (err) reject(err);
                    (!same) ? reject('Password was incorrect') : resolve(row);
                });
            }
        });
    });

}