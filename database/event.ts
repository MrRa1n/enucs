type EventType = {
    title: string,
    start_time: Date,
    end_time: Date,
    location_name: string
};

export class Event {
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
}
