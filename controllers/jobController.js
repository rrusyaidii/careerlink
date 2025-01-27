import Job from "../models/JobModels.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }); //user yang create je nampak GET ni
  res.status(StatusCodes.OK).json({ jobs });
};

//CREATE JOBS
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//GET SINGLE JOB
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

//DELETE JOB
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "Job Deleted", job: removedJob });
};
