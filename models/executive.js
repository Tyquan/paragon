var mongoose = require('mongoose');

var executiveSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
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
    phonenumber: {
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

var Executive = mongoose.model('Executive', executiveSchema);

module.exports = Executive;