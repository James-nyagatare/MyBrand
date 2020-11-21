const express = require("express");
const GeneralValidator = require("../validators/generalValidators");
const BlogController = require("../controllers/blogController");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlog);
router.post(
  "/",
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.createBlog
);
router.put(
  "/:id",
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.updateBlog
);

router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
