const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: String,
  Users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
