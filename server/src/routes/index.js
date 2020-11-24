const { Router } = require("express");

const queryRoutes = require("./queryRoute");
const blogRoutes = require("./blogRoute");
const commentRoutes = require("./commentRoute");
const userRoutes = require("./userRoute");

const routes = Router();
routes.use("/queries", queryRoutes);
routes.use("/blogs", blogRoutes);
routes.use("/comments", commentRoutes);
routes.use("/users", userRoutes);

module.exports = routes;
