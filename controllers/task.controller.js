const Task = require("../models/Task.model");

module.exports.taskController = {
  createTask: async (req, res) => {
    try {
      const { header, title, room, user, startDate, completionDate, solved } =
        req.body;
      const data = await Task.create({
        header,
        title,
        room,
        user,
        startDate,
        completionDate,
        solved,
      });
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  getAllTask: async (req, res) => {
    try {
      const data = await Task.find().populate("user");
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  getTaskInRoom: async (req, res) => {
    try {
      const data = await Task.find({ room: req.params.id });
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  changeTaskSolved: async (req, res) => {
    try {
      const data = await Task.findByIdAndUpdate(
        req.params.id,
        {
          solved: req.body.solved,
        },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  changeTask: async (req, res) => {
    try {
      const { header, title, room, user, startDate, completionDate, solved } =
        req.body;
      const data = await Task.findByIdAndUpdate(
        req.params.id,
        {
          header,
          title,
          room,
          user,
          startDate,
          completionDate,
          solved,
        },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
  deleteTask: async (req, res) => {
    try {
      const data = await Task.findByIdAndDelete(req.params.id);
      
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
};
