var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    compensation: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    requiredSkills: {
        type: String
    },
    benefits: {
        type: String
    },
    applicants: [{
        fullname: {
            type: String
        },
        email: {
            type: String
        },
        phonenumber: {
            type: String
        },
        details: {
            type: String
        },
        date_created: {
            type: Date,
            default: Date.now
        }
    }],
    date_created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
    
}, {
  usePushEach: true
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job