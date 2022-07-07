const express = require("express");
const helmet = require("helmet");
var cors = require("cors");

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
app.use(helmet());
app.use(cors());

//ROUTES
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Task Manager API</h1>");
});
app.use("/api/users", usersRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/groups", groupsRoute);

app.use("*", (req, res) => {
    res.status(404).json({ message: "This endpoint does not exist" });
});

app.use((err, req, res, next) => {
    //eslint-disable-line
    res.status(err.status || 500).json({ message: err.message });
});
//CONNECT TO MONGO DATABASE
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(console.log("Connected!"));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
