const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserAccountSchema = new Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    date: {
        type: String,
        defaultValue: Date.now()
    }
});

// Model
const UserAccount = mongoose.model('User', UserAccountSchema);

module.exports = UserAccount;
