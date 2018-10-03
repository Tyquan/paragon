var mongoose = require('mongoose');

var resumeSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
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
    date_created: {
        type: Date,
        default: Date.now
    }
    
}, {
  usePushEach: true
});

var Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume