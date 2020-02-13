const express = require("express");
const router = express.Router();
const config = require("config");

//setting up env variable
const JWT_SECRET = process.env.JWT_SETRET || config.get("JWT_SECRET");

//importing model
const Admin = require("../models/admin/Admin");

router.post("/createAdmin", async (req, res) => {
  try {
    let newadmin = new Admin({
      name: "admin",
      password: "admin12345"
    });

    newadmin.save();
  } catch (error) {
    return res.status(400).json({
      succes: false,
      error: error.message
    });
  }
});

module.exportsrouter;
