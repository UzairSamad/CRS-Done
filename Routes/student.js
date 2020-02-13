const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const authStudent = require("../Middlewares/authStudent");
const mongoose = require("mongoose");

//setting up env variable
const JWT_SECRET = process.env.JWT_SETRET || config.get("JWT_SECRET");

//importing student db

const Student = require("../models/student/Student");

// validating api parameters
const validateApiParams = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
});

// router for getting all students

router.get("/get-students", async (req, res) => {
  const allStudents = await Student.find({});

  res.json({
    succes: true,
    allStudents
  });
});

//@route post
//desc Register Student
//acces public

router.post("/register", async (req, res) => {
  // destructure username and password
  let { username, password, email, name, gender } = req.body;
  console.log(username);
  console.log(password);
  console.log(gender);

  try {
    const { error } = validateApiParams.validate({ username, password });
    if (error) {
      return res.status(400).json({
        succes: false,
        message: error.details[0].message
      });
    }

    // check student username name in db before creating a new user

    let user = await Student.findOne({ username });
    if (user) {
      return res.status(400).json({
        succes: false,
        message: "Username already exists try another one"
      });
    }

    //create a new student

    newuser = await new Student({
      name,
      username,
      password,
      email,
      gender,
      isActive: true
    });

    //hash pasword

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //replacing password with hash
    newuser.password = hash;

    //save into db
    await newuser.save();

    //create json web token

    const payload = {
      newuser: {
        username: newuser.username,
        id: newuser._id
      }
    };

    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d"
    });

    //sending respose
    return res.status(200).json({
      succes: true,
      token,
      username,
      message: "Student register succesfully"
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// @Post  api/v1/student/login
// login student

router.post("/login", async (req, res) => {
  //destructure username and password
  let { username, password } = req.body;

  //lowercase username
  username = username.toLowerCase();

  //validating api params

  //   const { error } = validateApiParams.validate({ username, password });
  //   if (error) {
  //     return res.status(400).json({
  //       succes: false,
  //       error: error.details[0].message
  //     });
  //   }
  try {
    //find student

    const student = await Student.findOne({ username });
    console.log(student);
    if (!student) {
      return res.status(400).json({
        succes: false,
        message: "Please provide a valid username"
      });
    }

    //compare password

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "incorrect Password"
      });
    }

    //create json web token
    const payload = {
      student: {
        username: student.username,
        id: student._id
      }
    };

    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d"
    });

    //send response
    return res.status(200).json({
      succes: true,
      message: "login succesfully",
      token,
      username: student.username,
      id: student._id,
      email: student.email,
      gender: student.gender,
      name: student.name
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      messae: "internal server error",
      error: error.message
    });
  }
});

// @route    DELETE api/v1/student/delete-student/:id
// @desc     delete student
// @access   Private
router.put("/delete-student/:id", async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Object Id" });
  }
  try {
    const deletedTask = await Student.findById(req.params.id);
    if (!deletedTask) {
      return res
        .status(400)
        .json({ success: false, message: "Student Not Found" });
    }
    deletedTask.isActive = false;
    deletedTask.save();

    return res.json({ success: true, message: "Student  deleted succesfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error Occured", error: error.message });
  }
});
module.exports = router;
