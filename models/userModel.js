const mongoose = require('mongoose');

// Schema for creating users
const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model("user", userSchema)
