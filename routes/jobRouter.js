import { Router } from "express";
const router = Router();
import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

//GET ALL JOB & CREATE JOB ROUTE
router.route("/").get(getAllJobs).post(validateJobInput, createJob);
//GET SINGLE JOB & UPDATE JOB & DELETE JOB ROUTE
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateJobInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
