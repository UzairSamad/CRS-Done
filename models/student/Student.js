const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlegth: 8
    },
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", StudentSchema);
