const mongoose = require("mongoose");

//TASK SCHEMA

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 255,
    },
    deadline: {
        type: String,
        required: true,
        min_length: 6,
        max_length: 10,
    },
    priority: {
        type: String,
        required: true,
        min_length: 4,
        max_length: 20,
    },
    status: {
        type: String,
        required: true,
        min_length: 4,
        max_length: 12,
    },
    group_name: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
    },
    created_by: {
        type: String,
        required: true,
        min_length: 8,
        max_length: 50,
    },
});

module.exports = new mongoose.model("Task", TaskSchema);
