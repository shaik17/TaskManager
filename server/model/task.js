const mongoose = require("mongoose");
const shortid = require("shortid");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    taskId: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    taskname: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", TaskSchema);
