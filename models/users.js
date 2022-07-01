const mongoose = require("mongoose");

//USER SCHEMA

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
    },
});

module.exports = new mongoose.model("User", UserSchema);
