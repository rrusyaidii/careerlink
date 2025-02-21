import Job from "../models/JobModels.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  console.log("aa", req.query);

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  //SORT
  const sortOptions = {
    Newest: "-createdAt",
    Oldest: "createdAt",
    "A-Z": "position",
    "Z-A": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.Newest;

  if (jobStatus && jobStatus !== "All") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }

  //SETUP PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  //pagination
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
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

//SHOW STATS
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);

  const defaultStats = {
    Pending: stats.Pending || 0,
    Interview: stats.Interview || 0,
    Declined: stats.Declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
