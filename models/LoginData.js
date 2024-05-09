const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model("users", userSchema); // Changed "Collection" to "User" for better naming convention

module.exports = User;


