const { Router } = require("express");

const queryRoutes = require("./queryRoute");
const blogRoutes = require("./blogRoute");
const commentRoutes = require("./commentRoute");

const routes = Router();
routes.use("/queries", queryRoutes);
routes.use("/blogs", blogRoutes);
routes.use("/comments", commentRoutes);

module.exports = routes;
