const express = require("express");
const rooter = express.Router();
const Group = require("../models/groups");

/**
 * CREATE
 */

rooter.post("/", (req, res) => {
    const { body } = req;

    newGroup = new Group({
        name: body.name,
    });

    newGroup
        .save()
        .then((newGroup) => {
            res.send(newGroup);
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
    Group.find()
        .then((Books) => {
            res.send(Books);
        })
        .catch((err) => {
            res.send(err);
        });
});
rooter.get("/:groupId", (req, res) => {
    Group.findById(req.params.groupId)
        .then((group) => {
            if (!group) {
                res.status(404).send("Group not found!");
            }
            res.send(group);
        })
        .catch((err) => {
            res.send(err);
        });
});

/**
 * UPDATE
 */

rooter.put("/:groupId", async (req, res) => {
    const updatedGroup = await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            name: req.body.name,
        },
        { new: true }
    );

    if (!updatedGroup) {
        res.status(404).send("Group not found!");
    }
    res.send(updatedGroup);
});

/**
 * DELETE
 */

rooter.delete("/:groupId", async (req, res) => {
    const group = await Group.findByIdAndRemove(req.params.groupId);
    if (!group) {
        res.status(404).send("Group not found!");
    }
    res.send(group);
});

module.exports = rooter;
