import fs from 'fs';
import { Client, ClientConfig } from 'pg';

export class Database {
    private client: Client;

    constructor(config?: ClientConfig) {
        this.client = new Client(config || JSON.parse(fs.readFileSync('config/database.json', 'utf8')));
        this.client.connect();
    }

    public getEvents(callback: Function): void {
        this.client.query('SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id ORDER BY start_time', (err: Error, res: any) => {
            callback(err, res.rows);
        });
    }

    public getFutureEvents(limit: number, callback: Function): void {
        this.client.query("SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id WHERE end_time >= DATE('now') ORDER BY start_time LIMIT $1::integer", [limit], (err: Error, res: any) => {
            callback(err, res.rows);
        });
    }
}
