import fs from 'fs';
import { Client, ClientConfig } from 'pg';

import Event from './event';

export default class Database {
    private client: Client;

    constructor(config?: ClientConfig) {
        this.client = new Client(config || JSON.parse(fs.readFileSync('config/database.json', 'utf8')));
        this.client.connect();
    }

    public async getEvents(): Promise<Event[]> {
        return this.client
            .query('SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id ORDER BY start_time')
            .then(res => Event.fromArray(res.rows))
            .catch(e => e);
    }

    public async getFutureEvents(limit: number): Promise<Event[]> {
        return this.client
            .query("SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id WHERE end_time >= DATE('now') ORDER BY start_time LIMIT $1::integer", [limit])
            .then(res => Event.fromArray(res.rows))
            .catch(e => e);
    }
}
