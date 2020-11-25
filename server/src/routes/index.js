import { Router } from "express";

import queryRoutes from "./queryRoute";
import blogRoutes from "./blogRoute";
import commentRoutes from "./commentRoute";
import userRoutes from "./userRoute";

const routes = Router();
routes.use("/queries", queryRoutes);
routes.use("/blogs", blogRoutes);
routes.use("/comments", commentRoutes);
routes.use("/users", userRoutes);

export default routes;
