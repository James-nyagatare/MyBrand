import { setUpSwaggerUi } from "../swagger";

import queryRoutes from "./queryRoute";
import blogRoutes from "./blogRoute";
import commentRoutes from "./commentRoute";
import userRoutes from "./userRoute";

const routes = (app) => {
  app.use("/api/v1", queryRoutes);
  app.use("/api/v1", blogRoutes);
  app.use("/api/v1", commentRoutes);
  app.use("/api/v1", userRoutes);
  setUpSwaggerUi(app);
  return app;
};
export default routes;
