const Response = require("./response");
const Blog = require("../models/blogModel");

class DbValidator {
  static async findById(req, res) {
    try {
      const result = await Blog.findById(req.params.id);
      return result;
    } catch (error) {
      return Response.error(res, 404, "Blog Not Found");
    }
  }
}

module.exports = DbValidator;
