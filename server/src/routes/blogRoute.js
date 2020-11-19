const express = require("express");
const BlogController = require("../controllers/blogController");

const router = express.Router();

router.get("/blogs", BlogController.getBlogs);
router.post("/blogs", BlogController.createBlog);

module.exports = router;
