const express = require("express");
const rooter = express.Router();
const Task = require("../models/tasks");

rooter.get("/", (req, res) => {});

rooter.post("/", (req, res) => {
    const { body } = req;

    newTask = new Task({
        name: body.name,
        description: body.description,
        deadline: body.deadline,
        priority: body.priority,
        status: body.status,
        group_name: body.group_name,
        created_by: body.created_by,
    });

    newTask
        .save()
        .then((newTask) => {
            res.send(newTask);
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).send("Name Taken!");
            }
            res.status(400).send(err);
        });
});

module.exports = rooter;
