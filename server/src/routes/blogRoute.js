import { Router } from "express";
import { GeneralValidator } from "../validators/generalValidators";
import { BlogController } from "../controllers/blogController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlog);
router.post(
  "/",
  AuthMiddleware.adminAuth,
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.createBlog
);
router.put(
  "/:id",
  AuthMiddleware.adminAuth,
  GeneralValidator.updateValidator,
  BlogController.updateBlog
);

router.delete("/:id", AuthMiddleware.adminAuth, BlogController.deleteBlog);

router.patch("/:id/like", BlogController.addLike);

export default router;
