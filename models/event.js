let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let Event = module.exports = mongoose.model('Event', eventSchema);