const Blog = require("../models/blogModel");
const Response = require("../helpers/response");
const uploadToCloud = require("../config/cloudinary");

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
    const img = await uploadToCloud(req.file);
    if (!img) return Response.error(res, 500, "Failed to upload photo");
    try {
      const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        blogImage: img.url,
      });
      Response.success(res, 201, blog);
    } catch (err) {
      if (err.code === 11000)
        return Response.error(res, 400, "Duplicate field value entered");
      Response.error(res, 500, err);
    }
  }

  static async getBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      if (blog === null) return Response.error(res, 404, "Blog not found");
      return Response.success(res, 200, blog);
    } catch (err) {
      Response.error(res, 404, "Blog not found");
    }
  }

  static async updateBlog(req, res) {
    const img = await uploadToCloud(req.file);
    if (!img) return Response.error(res, 500, "Failed to upload photo");
    try {
      const blogUpdated = await Blog.findOneAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          blogImage: img.url,
        },
        { new: true }
      );
      if (blogUpdated === null)
        return Response.error(res, 404, "Blog not found");
      return Response.success(res, 200, blogUpdated);
    } catch (error) {
      return Response.error(res, 404, "Blog not found");
    }
  }

  static async deleteBlog(req, res) {
    try {
      const deleteBlog = await Blog.findByIdAndRemove(req.params.id);
      if (deleteBlog === null)
        return Response.error(res, 404, "Blog not found");
      return Response.success(res, 200, deleteBlog);
    } catch (error) {
      return Response.error(res, 404, "Blog not found");
    }
  }
}

module.exports = BlogController;
