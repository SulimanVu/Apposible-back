const fileService = require("../services/file.service");
const File = require("../models/File.model");
const User = require("../models/User.model");

module.exports.fileController = {
  createDir: async (req, res) => {
    try {
      const { name, type, parent, room } = req.body;
      const file = await File.create({
        name,
        type,
        parent,
        room,
      });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);

        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  
  getFiles: async (req, res) => {
    try {
      const files = await File.find({
        room: req.query.room,
        parent: req.query.parent,
      });

      return res.json(files);
    } catch (error) {
      res.status(500).json({ message: "can not get files" });
    }
  },
};
