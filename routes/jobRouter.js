import { Router } from "express";
const router = Router();
import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

//GET ALL JOB & CREATE JOB ROUTE
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

//GET ALL STATS
router.route("/stats").get(showStats);

//GET SINGLE JOB & UPDATE JOB & DELETE JOB ROUTE
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
