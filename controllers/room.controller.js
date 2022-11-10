const Room = require("../models/Room.model");
const User = require("../models/User.model");

module.exports.roomController = {
  createRoom: async (req, res) => {
    try {
      const data = await Room.create({
        name: req.body.name,
        users: req.params.id,
      });

      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  getRoom: async (req, res) => {
    try {
      const data = await Room.find();
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  deleteRoom: async (req, res) => {
    try {
      const data = await Room.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  addUserRoom: async (req, res) => {
    try {
      const data = await Room.findByIdAndUpdate(req.params.id, {
        $addToSet: { users: req.body.users },
      });
      const result = await data.populate("users");
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  },
  deleteUserRoom: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);

      const user = await room.users.find((item) => {
        return item.toString() === req.body.users;
      });

      const data = await Room.updateOne(room, {
        $pull: { users: user },
      });

      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
};
