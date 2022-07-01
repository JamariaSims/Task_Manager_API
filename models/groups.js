const mongoose = require("mongoose");

//USER SCHEMA

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
        unique: true,
    },
});

module.exports = new mongoose.model("Group", GroupSchema);
