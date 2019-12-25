type EventType = {
    title: string,
    start_time: Date,
    end_time: Date,
    location_name: string
};

type DisplayableEvent = {
    title: string,
    start_time: string,
    end_time: string,
    location_name: string,
    date?: string
}

export default class Event {
    title: string;
    start_time: Date;
    end_time: Date;
    location_name: string;

    constructor(json: EventType) {
        this.title = json.title;
        this.start_time = json.start_time;
        this.end_time = json.end_time;
        this.location_name = json.location_name;
    }

    public static fromArray(array: EventType[]): Event[] {
        return array.map(json => new Event(json));
    }

    public prettifyDates(): DisplayableEvent {
        let res: DisplayableEvent = {
            title: this.title,
            start_time: '',
            end_time: '',
            location_name: this.location_name,
            date: undefined
        };

        if(this.start_time.toDateString() != this.end_time.toDateString()) {
            res.start_time = this.start_time.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            res.end_time = this.end_time.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

        } else {
            res.date = this.start_time.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            res.start_time = this.start_time.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });

            res.end_time = this.end_time.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return res;
    }
}
