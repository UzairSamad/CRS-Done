const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

// import job model
const Job = require("../models/company/Job");
const authJob = require("../Middlewares/authJob");

// @ post a job route

router.post("/post-job", authJob, async (req, res) => {
  const { jobTitle, jobDescription, companyName, email } = req.body;

  try {
    // create a new

    let newjob = new Job({
      jobTitle,
      jobDescription,
      companyName,
      email,
      postedBy: req.company.id
    });

    //save details to db
    await newjob.save();
    console.log("job saved");

    //populate created detail

    newjob = await newjob.populate("postedBy", { password: 0 }).execPopulate();

    return res.json({
      succes: true,
      message: "Job Created succesfully",
      newjob
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Internal Server Error at job operation",
      error: error.message
    });
  }
});

//get all job
router.get("/get-jobs", async (req, res) => {
  const allJobs = await Job.find({});

  res.json({
    succes: true,
    allJobs
  });
});

//apply for a job

router.post("/apply-now", async (req, res) => {
  try {
    console.log(req.body.studentID);
    let job = await Job.findById(req.body.jobID);
    console.log(job);
    if (!job) {
      return res.status(400).json({
        succes: false
      });
    }

    console.log(job);
    await job.appliedBy.push(req.body.studentID);

    await job.save();
    res.json({
      succes: true,
      job
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "internal server error",
      error: error.message
    });
  }
});
module.exports = router;
