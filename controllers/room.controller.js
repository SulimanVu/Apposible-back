const { access } = require("fs");
const Room = require("../models/Room.model");

module.exports.roomController = {
  createRoom: async (req, res) => {
    try {
      const data = await Room.create({
        name: req.body.name,
        users: { user: req.params.id },
        access: req.params.id,
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
        $push: { users: { user: req.body.user, comment: req.body.comment } },
        $addToSet: { access: req.body.user },
      });
      const result = await data;
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  },
  deleteUserRoom: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);

      const user = await room.users.find((item) => {
        return item.user.toString() === req.body.user;
      });
      const data = await Room.updateOne(room, {
        $pull: { access: user.user.toString() },
      });

      const result = await data.map((item) => item.populate("access"));
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  },
};
