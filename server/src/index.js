const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mybrand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => console.log("something went wrong", err.message));

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
