import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";
import { DATABASE_TEST, DATABASE_URL, NODE_ENV, PORT } from "./config/env";

const app = express();

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connected...");
  });

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const port = PORT;
app.listen(port, console.log(`Listening on port ${port}...`));

export default app;
