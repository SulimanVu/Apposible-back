const Room = require("../models/Room.model");

module.exports.roomController = {
  createRoom: async (req, res) => {
    try {
      const { name } = req.body;
      const data = await Room.create({
        name,
        access: req.params.id,
      });
      const result = await data.populate("access");
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  },
  getRoom: async (req, res) => {
    try {
      const data = await Room.find().populate("users.user access");
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
      const { user, comment, time } = req.body;
      const room = await Room.findById(req.params.id);
      const result = room.access.filter((item) => item.toString() === user);

      if (result.toString()) {
        const data = await Room.findByIdAndUpdate(req.params.id, {
          $push: { users: { user: user, comment: comment, time: time } },
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
      const data = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { access: req.body.user },
        },
        { new: true }
      ).populate("access");

      return res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  deleteUserRoom: async (req, res) => {
    try {
      const data = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { access: req.body.user },
        },
        { new: true }
      ).populate("access");

      return res.json();
    } catch (error) {
      res.json(error);
    }
  },
};
