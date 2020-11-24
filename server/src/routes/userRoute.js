const passport = require("passport");
const { Router } = require("express");
const GeneralValidator = require("../validators/generalValidators");
const UserController = require("../controllers/userController");
const upload = require("../config/multer");
const { adminAuth } = require("../middlewares/auth");
const Response = require("../helpers/response");

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
  adminAuth,
  upload.single("profileImage"),
  UserController.updateProfilePicture
);

module.exports = router;
