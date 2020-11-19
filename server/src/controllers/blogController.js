const Blog = require("../models/blogModel");
const Response = require("../helpers/response");

class BlogController {
  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      Response.success(res, 200, blogs);
    } catch (err) {
      Response.error(res, 500, err);
    }
  }

  static async createBlog(req, res) {
    try {
      const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
      });
      Response.success(res, 201, blog);
    } catch (err) {
      Response.error(res, 500, err);
    }
  }

  static async getBlog(req, res) {
    try {
      const blogId = req.params.id;
      if (!blogId) return Response.error(res, 400, "Please provide blog Id");
      const blog = await Blog.findOne({ _id: blogId });
      if (!blog) return Response.error(res, 404, "Blog not found");
      return Response.success(res, 200, blog);
    } catch (err) {
      Response.error(res, 500, err.message);
    }
  }
}

module.exports = BlogController;
