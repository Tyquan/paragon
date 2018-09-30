var mongoose = require('mongoose');

var resumeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
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