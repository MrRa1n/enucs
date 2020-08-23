# Database Schema

## Tables

### events

| Column | Type |
|--------|------|
| id | integer NOT NULL PRIMARY KEY |
| title | text |
| start_time | timestamp without time zone |
| end_time | timestamp without time zone |
| location_id | integer FOREIGN KEY REFERENCES locations(id) |
| year_id | integer FOREIGN KEY REFERENCES years(id) |
| term_id | integer FOREIGN KEY REFERENCES terms(id) |

Stores a society event. Main table of the website.

`title` is just the title of the event.

`start_time` is a date in the format `YYYY-MM-DD HH:mm:ss` (e.g. 2019-09-12 10:00:00).

`end_time` is a date in the format `YYYY-MM-DD HH:mm:ss` (e.g. 2019-09-12 16:00:00).

`location_id` references an entry in the `locations` table.

`year_id` references an entry in the `years` table.

`term_id` references an entry in the `terms` table.

### locations

| Column | Type |
|--------|------|
| id | integer NOT NULL PRIMARY KEY |
| name | text |

Stores a location for an event. `name` can be in any format, examples are `???` for an event with an unknown location, or `Merchiston, C28` for our usual room. Add new locations as required.

### years

| Column | Type |
|--------|------|
| id | integer NOT NULL PRIMARY KEY |
| description | text |
| short_name | text |

Stores each academic year. `description` format is `YYYY - YYYY` (e.g. 2019/2020). `short_name` format is `yy-yy` (e.g. 19-20). Add a new entry here for each academic year.

### terms

| Column | Type |
|--------|------|
| id | integer NOT NULL PRIMARY KEY |
| description | text |
| short_name | text |

Just contains a long and short name for terms 1 through 3. You won't need to change this table.

### current_year_term

| Column | Type |
|--------|------|
| year_id | integer FOREIGN KEY REFERENCES years(id) |
| term_id | integer FOREIGN KEY REFERENCES terms(id) |

This is used by the `/events/` route to display the upcoming relevant events when the page loads. Currently needs to be manually updated each new term.

## Usage

Currently events need to be manually inserted into the database. The way to do this is to either write them to a SQL file and then run that with `psql -f file.sql` and insert them, or to just manually do it in the Postgres prompt.

A web view to add events has been planned for a while but has yet to be implemented.
