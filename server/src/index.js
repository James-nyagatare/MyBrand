const express = require("express");
const mongoose = require("mongoose");
const queryRoutes = require("./routes/queryRoute");
const blogRoutes = require("./routes/blogRoute");

const morgan = require("morgan");
const app = express();

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
app.use("/api/queries", queryRoutes);
app.use("/api/blogs", blogRoutes);
const port = 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
