import { Router } from "express";
import { QueryController } from "../controllers/queryController";
import { AuthMiddleware } from "../middlewares/auth";
import { GeneralValidator } from "../validators/generalValidators";

const router = Router();

/**
 * @swagger
 * /queries:
 *   get:
 *     tags:
 *       - Queries
 *     name: Query
 *     summary: Retrieve all queries
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: Queries successfully Retrieved.
 *       401:
 *             description: unauthorized
 * */
router.get("/queries", AuthMiddleware.adminAuth, QueryController.getQueries);

/**
 * @swagger
 * /queries:
 *   post:
 *     tags:
 *       - Queries
 *     name: Query
 *     summary: Creates a query
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
 *                message:
 *                 type: string
 *         required:
 *                -name
 *                -email
 *                -message
 *     responses:
 *       201:
 *             description: query created successfully.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server down.
 * */

router.post(
  "/queries",
  GeneralValidator.queryValidator,
  QueryController.createQueries
);

export default router;
