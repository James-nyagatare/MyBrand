import { Router } from "express";
import { GeneralValidator } from "../validators/generalValidators";
import { UserController } from "../controllers/userController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/auth";

const router = Router();

router.post(
  "/register",
  GeneralValidator.userRegisterValidator,
  UserController.registerUser
);
router.post(
  "/login",
  GeneralValidator.userLoginValidator,
  UserController.loginUser
);

router.put(
  "/updateProfile/:id",
  AuthMiddleware.adminAuth,
  upload.single("profileImage"),
  UserController.updateProfilePicture
);

export default router;
