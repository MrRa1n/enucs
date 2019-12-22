const fs = require('fs');
const { Client } = require('pg');
const client = new Client(JSON.parse(fs.readFileSync('config/database.json', 'utf8')));

client.connect();

exports.getEvents = (callback) => {
    client.query('SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id ORDER BY start_time', (err, res) => {
        callback(err, res.rows);
    });
}

exports.getFutureEvents = (limit, callback) => {
    client.query("SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id WHERE end_time >= DATE('now') ORDER BY start_time LIMIT $1::integer", [limit], (err, res) => {
        callback(err, res.rows);
    });
}

module.exports = exports;
