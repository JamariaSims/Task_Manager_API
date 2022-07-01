const express = require("express");
const rooter = express.Router();
const Task = require("../models/tasks");

/**
 * CREATE
 */
rooter.post("/", (req, res) => {
    const { body } = req;
    const {
        name,
        description,
        deadline,
        priority,
        status,
        group_name,
        created_by,
    } = body;
    newTask = new Task({
        name: name,
        description: description,
        deadline: deadline,
        priority: priority,
        status: status,
        group_name: group_name,
        created_by: created_by,
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
/**
 * READ
 */
rooter.get("/", (req, res) => {
    Task.find()
        .then((Task) => {
            res.send(Task);
        })
        .catch((err) => {
            res.send(err);
        });
});
rooter.get("/:taskId", (req, res) => {
    Task.findById(req.params.taskId)
        .then((task) => {
            if (!task) {
                res.status(404).send("Task not found!");
            }
            res.send(task);
        })
        .catch((err) => {
            res.send(err);
        });
});
/**
 * UPDATE
 */
rooter.put("/:taskId", async (req, res) => {
    const { body } = req;
    const {
        name,
        description,
        deadline,
        priority,
        status,
        group_name,
        created_by,
    } = body;
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
            name: name,
            description: description,
            deadline: deadline,
            priority: priority,
            status: status,
            group_name: group_name,
            created_by: created_by,
        },
        { new: true }
    );

    if (!updatedTask) {
        res.status(404).send("Task not found!");
    }
    res.send(updatedTask);
});
/**
 * DELETE
 */
rooter.delete("/:taskId", async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.taskId);
    if (!task) {
        res.status(404).send("Task not found!");
    }
    res.send(task);
});

module.exports = rooter;
