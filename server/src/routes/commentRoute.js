const express = require("express");
const BlogController = require("../controllers/blogController");
const dbValidator = require("../validators/dbValidator");
const GeneralValidator = require("../validators/generalValidators");

const router = express.Router();

router.post(
  "/:id",
  dbValidator,
  GeneralValidator.commentValidator,
  BlogController.addComment
);

module.exports = router;
