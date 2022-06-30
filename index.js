const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(console.log("Connected!"));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
