import { Router } from "express";
import { QueryController } from "../controllers/queryController";
import { AuthMiddleware } from "../middlewares/auth";
import { GeneralValidator } from "../validators/generalValidators";

const router = Router();

router.get("/", AuthMiddleware.adminAuth, QueryController.getQueries);
router.post(
  "/",
  GeneralValidator.queryValidator,
  QueryController.createQueries
);

export default router;
