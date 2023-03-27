const fileService = require("../services/file.service");
const File = require("../models/File.model");
require("dotenv").config();
const fs = require("fs");
const Room = require("../models/Room.model");

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

  fileUpload: async (req, res) => {
    try {
      const file = await req.files.file;
      const parent = await File.findOne({
        room: req.body.room,
        _id: req.body.parent,
      });

      const room = await Room.findOne({ _id: req.body.room });

      if (room.usedSpace + file.size > room.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }

      room.usedSpace = (await room.usedSpace) + file.size;

      let path;
      if (parent) {
        path = `${process.env.FILE_PATH}\\${room._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${process.env.FILE_PATH}\\${room._id}\\${file.name}`;
      }

      if (fs.existsSync(path)) {
        res.status(400).json({ message: "File already exist" });
      }

      file.mv(path);

      const type = await file.name.split(".").pop();

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        room: req.body.room,
      });

      await room.save();
      await dbFile.save();

      res.json(dbFile);
    } catch (error) {
      res.status(400).json({ message: "can not get files" });
    }
  },
};
