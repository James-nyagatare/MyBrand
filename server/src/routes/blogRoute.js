const { Router } = require("express");
const GeneralValidator = require("../validators/generalValidators");
const BlogController = require("../controllers/blogController");
const upload = require("../config/multer");
const { adminAuth } = require("../middlewares/auth");

const router = Router();

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlog);
router.post(
  "/",
  adminAuth,
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.createBlog
);
router.put(
  "/:id",
  adminAuth,
  GeneralValidator.updateValidator,
  BlogController.updateBlog
);

router.delete("/:id", adminAuth, BlogController.deleteBlog);

router.patch("/:id/like", BlogController.addLike);

module.exports = router;
