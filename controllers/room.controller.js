const { access } = require("fs");
const Room = require("../models/Room.model");

module.exports.roomController = {
  createRoom: async (req, res) => {
    try {
      const { name, access } = req.body;
      const data = await Room.create({
        name,
        access,
      });
      const result = await data.populate("access");
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  },
  getRoom: async (req, res) => {
    try {
      const data = await Room.find().populate("access");
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
  addComment: async (req, res) => {
    try {
      const { user, comment } = req.body;
      const room = await Room.findById(req.params.id);
      const result = room.access.filter((item) => item.toString() === user);

      if (result.toString()) {
        const data = await Room.findByIdAndUpdate(req.params.id, {
          $push: { users: { user: user, comment: comment } },
        });

        res.json(data.users);
      } else {
        res.json("Такой пользователь не найден");
      }
    } catch (error) {
      res.json(error);
    }
  },
  addUserToRoom: async (req, res) => {
    try {
      const { user } = req.body;
      const data = await Room.findByIdAndUpdate(req.params.id, {
        $addToSet: { access: user },
      }).populate("access");

      return await res.json(data);
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
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
};
