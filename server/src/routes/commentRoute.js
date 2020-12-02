import express from "express";
import { BlogController } from "../controllers/blogController";
import { GeneralValidator } from "../validators/generalValidators";

const router = express.Router();

/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     tags:
 *       - Blogs
 *     name: comment
 *     summary: add a comment to a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                comment:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *             description: Comment successfully added.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */
router.post(
  "/comments/:id",
  GeneralValidator.commentValidator,
  BlogController.addComment
);

export default router;
