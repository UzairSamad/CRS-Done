const jwt = require("jsonwebtoken");
const config = require("config");

//  importing a country model
const Comapny = require("../models/company/Company");

//setting upenviroment variable
const JWT_SECRET = process.env.JWT_SETRET || config.get("JWT_SECRET");

module.exports = async (req, res, next) => {
  //get token from header and check
  const token = req.header("company-token");

  //if user had not token
  if (!token) {
    res.status(500).json({
      succes: false,
      message: "No token , Authorization Denied"
    });
  }

  try {
    //verify token
    const decoded = await jwt.verify(token, JWT_SECRET);

    //check if company exists in db
    const companyExists = await Comapny.findById(decoded.Company.id);
    console.log(companyExists, "this is ext");

    console.log(decoded, "this is decoded id");

    console.log(decoded.Comapny);
    if (!companyExists) {
      return res.status(400).json({
        succes: false,
        message: "Token is not valid"
      });
    }

    //set decoded object in req

    req.company = decoded.Company;
    console.log(req.comapny, "its req");

    next();
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "Internal Server Error at auth",
      error: error.message
    });
  }
};
