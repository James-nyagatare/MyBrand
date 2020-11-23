const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const routes = require("./routes");

mongoose
  .connect("mongodb://localhost/my-brand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => console.log("something went wrong", err.message));

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

app.use("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
