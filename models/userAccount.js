const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserAccountSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: false,
    },
});

// Model
const UserAccount = mongoose.model('User', UserAccountSchema);

module.exports = UserAccount;
