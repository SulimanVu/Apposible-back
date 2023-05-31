const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  header: String,
  title: String,
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Room",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  completionDate: {
    type: Date,
    default: Date.now(),
  },
  solved: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
