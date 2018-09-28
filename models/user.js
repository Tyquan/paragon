const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    username: {
    	type: String,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    }
}, {
  usePushEach: true
});

// Compile model from schema
const User = mongoose.model('User', UserModelSchema );

module.exports = User;