const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const usersRoute = require("./routes/users");
const tasksRoute = require("./routes/tasks");
const groupsRoute = require("./routes/groups");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/users", usersRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/groups", groupsRoute);

//CONNECT TO MONGO DATABASE
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(console.log("Connected!"));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
