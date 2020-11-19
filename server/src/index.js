const express = require("express");
const mongoose = require("mongoose");
const queryRoutes = require("./routes/queryRoute");

const app = express();

mongoose
  .connect("mongodb://localhost/my-brand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => console.log("something went wrong", err.message));
app.use(express.json());
app.use("/api", queryRoutes);
const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
