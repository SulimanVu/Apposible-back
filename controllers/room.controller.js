const Room = require("../models/Room.model");
const User = require("../models/User.model");

module.exports.roomController = {
  createRoom: async (req, res) => {
    const data = await Room.create({
      name: req.body.name,
      users: req.params.id,
    });

    res.json(data);
  },
  getRoom: async (req, res) => {
    const data = await Room.find();
    res.json(data);
  },
  deleteRoom: async (req, res) => {
    const data = await Room.findByIdAndDelete(req.params.id);
    res.json(data);
  },
  addUserRoom: async (req, res) => {
    const data = await Room.findByIdAndUpdate(req.params.id, {
      $addToSet: { users: req.body.users },
    });
    const result = await data.populate("users");
    res.json(result);
  },
  deleteUserRoom: async (req, res) => {
    const room = await Room.findById(req.params.id);

    const user = await room.users.find((item) => {
      return item.toString() === req.body.users;
    });

    const data = await Room.updateOne(room, {
      $pull: { users: user },
    });

    res.json(data);
  },
};
