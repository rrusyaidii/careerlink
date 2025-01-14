import Job from "../models/JobModels.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

//CREATE JOBS
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`No job with id: ${id}`); // Or any other custom error message
  }

  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`No job with id: ${id}`); // Or any other custom error message
  }

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    throw new NotFoundError(`no job with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

//DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`No job with id: ${id}`); // Or any other custom error message
  }

  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    throw new NotFoundError(`no job with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Job Deleted", job: removedJob });
};
