import express from "express";
import { BlogController } from "../controllers/blogController";
import { GeneralValidator } from "../validators/generalValidators";

const router = express.Router();

router.post(
  "/:id",
  GeneralValidator.commentValidator,
  BlogController.addComment
);

export default router;
