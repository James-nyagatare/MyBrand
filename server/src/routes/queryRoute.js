const express = require("express");
const QueryController = require("../controllers/queryController");
const GeneralValidator = require("../validators/generalValidators");

const router = express.Router();

router.get("/", QueryController.getQueries);
router.post(
  "/",
  GeneralValidator.queryValidator,
  QueryController.createQueries
);

module.exports = router;
