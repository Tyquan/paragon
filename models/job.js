var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    shortDetails: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
    
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job