import swaggerUi from "swagger-ui-express";
import swaggerDocs from "swagger-jsdoc";

const getDefinitions = () => ({
  info: {
    title: "James Portfolio",
    description:
      "The need for professionals to have an online presence and brand in this current age and generation can not be overemphasized. One having a good online presence means quick and easy access to opportunities. It gives prospective customers, employer easy to review your work, experience, and future ambition. While there are various ways and means to build online brands. We believe that having a personal website + blog which one can use to share basic information about themself and also share ideas with their network can have a huge impact on one's career.",
  },
  schemes: ["http", "https"],
  basePath: "/api/v1/",
  produces: ["application/json"],
});

const jsDocs = swaggerDocs({
  swaggerDefinition: getDefinitions(),
  apis: ["src/routes/*.js"],
});

const docsOption = {
  customSiteTitle: "Mybrand",
};
export const setUpSwaggerUi = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.serveFiles(jsDocs, docsOption)
  );
  app.get("/api-docs", (req, res) => {
    return res.send(swaggerUi.generateHTML(jsDocs, docsOption));
  });
};
