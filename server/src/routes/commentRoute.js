const express = require("express");
const BlogController = require("../controllers/blogController");
const GeneralValidator = require("../validators/generalValidators");

const router = express.Router();

router.post(
  "/:id",
  GeneralValidator.commentValidator,
  BlogController.addComment
);

module.exports = router;
