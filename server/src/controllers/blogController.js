const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const Response = require("../helpers/response");
const uploadToCloud = require("../config/cloudinary");

class BlogController {
  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      Response.success(res, 200, "Sucessfully retrieved all blogs", blogs);
    } catch (err) {
      Response.error(res, 500, err);
    }
  }

  static async createBlog(req, res) {
    try {
      if (!req.file) return Response.error(res, 400, "Blog image is required");
      const img = await uploadToCloud(req.file, res);
      const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        blogImage: img.url,
      });
      Response.success(res, 201, "Sucessfully Created the blog", blog);
    } catch (err) {
      if (err.code === 11000)
        return Response.error(res, 400, "Duplicate field value entered");
      Response.error(res, 500, err);
    }
  }

  static async getBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id }).populate(
        "comments"
      );
      if (blog === null) return Response.error(res, 404, "Blog not found");
      return Response.success(res, 200, "Sucessfully Retrieved the blog", blog);
    } catch (err) {
      Response.error(res, 404, "Blog not found");
    }
  }

  static async updateBlog(req, res) {
    try {
      const blogUpdated = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!blogUpdated) return Response.error(res, 404, "Blog not found");
      return Response.success(
        res,
        200,
        "Sucessfully Updated the blog",
        blogUpdated
      );
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, "Blog not updated!");
    }
  }

  static async deleteBlog(req, res) {
    try {
      const deleteBlog = await Blog.findByIdAndRemove(req.params.id);
      if (deleteBlog === null)
        return Response.error(res, 404, "Blog not found");
      return Response.success(
        res,
        200,
        "Sucessfully deleted the blog",
        deleteBlog
      );
    } catch (error) {
      return Response.error(res, 404, "Blog not found");
    }
  }

  static async addComment(req, res) {
    const blogId = req.params.id;
    if (!blogId) return Response.error(res, 400, "Please provide the blogId");
    const blog = await Blog.findById(blogId);
    if (!blog) return Response.success(res, 404, "Blog Not Found");
    try {
      const newComment = new Comment({ comment: req.body.comment });
      await newComment.save();
      blog.comments.push(newComment);
      blog.commentCounts += 1;
      await blog.save();
      return Response.success(
        res,
        201,
        "Comment sucessfully Created",
        newComment
      );
    } catch (error) {
      return Response.error(res, 500, "something went wrong");
    }
  }

  static async addLike(req, res) {
    const blogId = req.params.id;
    if (!blogId) return Response.error(res, 400, "Please provide the blogId");
    const blog = await Blog.findById(blogId);
    if (!blog) return Response.error(res, 404, "Blog Not Found");
    blog.likes += 1;
    try {
      await blog.save();
      return Response.success(res, 200, "Sucessfully Liked The Blog");
    } catch (error) {}
  }
}

module.exports = BlogController;
