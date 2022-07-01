const express = require("express");
const rooter = express.Router();
const User = require("../models/users");

rooter.get("/", (req, res) => {});

rooter.post("/", (req, res) => {
    const { body } = req;
    const { username, password } = body;
    console.log(body);
    newUser = new User({
        username: username,
        password: password,
    });

    newUser
        .save()
        .then((newUser) => {
            res.send(newUser);
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).send("Username Taken!");
            }
            res.status(400).send(err);
        });
});

module.exports = rooter;
