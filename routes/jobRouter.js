import { Router } from "express";
const router = Router();
import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

//GET ALL JOB & CREATE JOB ROUTE
router.route("/").get(getAllJobs).post(createJob);
//GET SINGLE JOB & UPDATE JOB & DELETE JOB ROUTE
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
