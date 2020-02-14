import fs from 'fs';
import { Client, ClientConfig } from 'pg';

import Event from './event';

export type Year = {
    id: number,
    description: string,
    short_name: string
};

export type Term = {
    id: number,
    description: string,
    short_name: string
};

export default class Database {
    private client: Client;

    constructor(config?: ClientConfig) {
        this.client = new Client(config || JSON.parse(fs.readFileSync('config/database.json', 'utf8')));
        this.client.connect();
    }

    public async getEvents(): Promise<Event[]> {
        return this.client
            .query('SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id ORDER BY start_time')
            .then(res => Event.fromArray(res.rows));
    }

    public async getFutureEvents(limit: number): Promise<Event[]> {
        return this.client
            .query("SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id WHERE end_time >= DATE('now') ORDER BY start_time LIMIT $1::integer", [limit])
            .then(res => Event.fromArray(res.rows));
    }

    public async getEventsFor(year: number, term: number): Promise<Event[]>{
        return this.client
            .query('SELECT title, start_time, end_time, name AS location_name FROM events JOIN locations ON location_id = locations.id WHERE year_id = $1::integer AND term_id = $2::integer ORDER BY start_time', [year, term])
            .then(res => Event.fromArray(res.rows));
    }

    public async getYear(shortName: string): Promise<Year> {
        return this.client
            .query('SELECT id, description, short_name FROM years WHERE short_name = $1::text', [shortName])
            .then(res => res.rows[0]);
    }

    public async getYears(): Promise<Year[]> {
        return this.client
            .query('SELECT id, description, short_name FROM years')
            .then(res => res.rows);
    }

    public async getTerm(shortName: string): Promise<Term> {
        return this.client
            .query('SELECT id, description, short_name FROM terms WHERE short_name = $1::text', [shortName])
            .then(res => res.rows[0]);
    }

    public async getCurrentYearTerm(): Promise<any> {
        return this.client
            .query('SELECT year_id, term_id FROM current_year_term')
            .then(res => res.rows[0]);
    }
}
