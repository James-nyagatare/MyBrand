import { Router } from "express";
import { GeneralValidator } from "../validators/generalValidators";
import { BlogController } from "../controllers/blogController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();
/**
 * @swagger
 * /blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: Retrieve all blogs
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully Retrieved.
 * */
router.get("/blogs", BlogController.getBlogs);
/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: retrieve single blog
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *             description: Blog successfully Retrieved.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 * */
router.get("/blogs/:id", BlogController.getBlog);
/**
 * @swagger
 * /blogs:
 *   post:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: Creates blog
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *       - in: formData
 *         name: content
 *         type: string
 *         required: true
 *       - in: formData
 *         name: blogImage
 *         type: file
 *         required: true
 *     responses:
 *       201:
 *             description: Blog successfully Created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */
router.post(
  "/blogs",
  AuthMiddleware.adminAuth,
  upload.single("blogImage"),
  GeneralValidator.blogValidator,
  BlogController.createBlog
);
/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     tags:
 *       - Blogs
 *     name: blog
 *     summary: Update a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                title:
 *                 type: string
 *                content:
 *                 type: string
 *     responses:
 *       200:
 *             description: Blog successfully updated.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */

router.put(
  "/blogs/:id",
  AuthMiddleware.adminAuth,
  GeneralValidator.updateValidator,
  BlogController.updateBlog
);
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     tags:
 *       - Blogs
 *     name: blog
 *     summary: Delete a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Blog successfully deleted.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */
router.delete(
  "/blogs/:id",
  AuthMiddleware.adminAuth,
  BlogController.deleteBlog
);
/**
 * @swagger
 * /blogs/{id}/like:
 *   patch:
 *     tags:
 *       - Blogs
 *     name: blog
 *     summary: add a like to a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Blog successfully liked.
 *       500:
 *             description: server error.
 * */
router.patch("/blogs/:id/like", BlogController.addLike);

export default router;
