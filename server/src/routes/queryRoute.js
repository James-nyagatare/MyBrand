const express = require("express");
const QueryController = require("../controllers/queryController");
const GeneralValidator = require("../validators/generalValidators");

const router = express.Router();

router.get("/queries", QueryController.getQueries);
router.post(
  "/queries",
  GeneralValidator.queryValidator,
  QueryController.createQueries
);

module.exports = router;
