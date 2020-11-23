const { Router } = require("express");
const GeneralValidator = require("../validators/generalValidators");
const BlogController = require("../controllers/blogController");
const upload = require("../config/multer");

const router = Router();

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlog);
router.post(
  "/",
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.createBlog
);
router.put("/:id", GeneralValidator.updateValidator, BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
