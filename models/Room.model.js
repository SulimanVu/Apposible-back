const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: String,
  users: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
      time: {
        type: String,
      },
    },
  ],
  access: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  admin: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
