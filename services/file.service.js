require("dotenv").config();
const fs = require("fs");
const File = require("../models/File.model");

class FileService {
  createDir(file) {
    // const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;
    const filePath = `${process.env.FILE_PATH}\\${file.room}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (error) {
        return reject({ message: "File error", error });
      }
    });
  }
}

module.exports = new FileService();
