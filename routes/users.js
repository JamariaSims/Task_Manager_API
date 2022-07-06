const express = require("express");
const rooter = express.Router();
const User = require("../models/users");

/**
 * CREATE
 */
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
/**
 * READ
 */
rooter.get("/", (req, res) => {
  User.find()
    .then((User) => {
      res.send(User);
    })
    .catch((err) => {
      res.send(err);
    });
});
// rooter.get("/:userId", (req, res) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         res.status(404).send("User not found!");
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });
rooter.get("/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send("User not found!");
    });
});

/**
 * UPDATE
 */
rooter.put("/:userId", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      username: req.body.username,
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404).send("User not found!");
  }
  res.send(updatedUser);
});
/**
 * DELETE
 */
rooter.delete("/:userId", async (req, res) => {
  const newUser = await User.findByIdAndRemove(req.params.userId);
  if (!newUser) {
    res.status(404).send("User not found!");
  }
  res.send(newUser);
});

module.exports = rooter;
