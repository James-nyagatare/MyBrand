const { Router } = require("express");
const QueryController = require("../controllers/queryController");
const { adminAuth } = require("../middlewares/auth");
const GeneralValidator = require("../validators/generalValidators");

const router = Router();

router.get("/", adminAuth, QueryController.getQueries);
router.post(
  "/",
  GeneralValidator.queryValidator,
  QueryController.createQueries
);

module.exports = router;
