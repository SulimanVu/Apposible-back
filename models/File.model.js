const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accessLink: String,
  size: {
    type: Number,
    default: 0,
  },
  path: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  room: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Room",
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "File",
  },
  childs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "File",
    },
  ],
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
