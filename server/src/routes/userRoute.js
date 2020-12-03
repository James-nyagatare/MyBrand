import { Router } from "express";
import { GeneralValidator } from "../validators/generalValidators";
import { UserController } from "../controllers/userController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Signup
 *     summary: Creates a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -name
 *                -email
 *                -password
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in the system.
 * */

router.post(
  "/users/register",
  GeneralValidator.userRegisterValidator,
  UserController.registerUser
);
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Login a user in the system
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *         required:
 *                -email
 *                -password
 *     responses:
 *       200:
 *             description: user logged in successfully.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: Invalid email or Password.
 * */
router.post(
  "/users/login",
  GeneralValidator.userLoginValidator,
  UserController.loginUser
);
/**
 * @swagger
 * /users/updateProfile/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     name: User
 *     summary: Update users profile picture
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - in: formData
 *         name: profileImage
 *         type: file
 *         required: true
 *     responses:
 *       201:
 *             description: profile image successfully updated.
 *       400:
 *             description: Bad request.
 *       403:
 *             description: Access denied.
 *       500:
 *             description: server down.
 * */
router.patch(
  "/users/updateProfile/:id",
  AuthMiddleware.adminAuth,
  upload.single("profileImage"),
  UserController.updateProfilePicture
);

export default router;
