const { Router } = require("express");

const queryRoutes = require("./queryRoute");
const blogRoutes = require("./blogRoute");

const routes = Router();
routes.use("/queries", queryRoutes);
routes.use("/blogs", blogRoutes);

module.exports = routes;
