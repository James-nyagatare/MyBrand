const Response = require("../helpers/response");
const Blog = require("../models/blogModel");

const dbValidator = async (req, res, next) => {
  try {
    await Blog.findById(req.params.id);
    next();
  } catch (error) {
    return Response.error(res, 404, "Blog Not Found!");
  }
};

module.exports = dbValidator;
