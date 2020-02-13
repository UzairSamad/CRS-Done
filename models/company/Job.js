const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    companyName: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    appliedBy: [],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  {
    timesstamps: true
  }
);

module.exports = mongoose.model("Job", JobSchema);
