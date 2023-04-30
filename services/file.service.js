require("dotenv").config();
const fs = require("fs");
const File = require("../models/File.model");

class FileService {
  createDir(file, isFile = false) {
    const filePath = `${process.env.FILE_PATH}\\${file.room}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          if (isFile) {
            fs.writeFileSync(filePath, '');
            return resolve({ message: "File was created" });
          } else {
            fs.mkdirSync(filePath);
            return resolve({ message: "Directory was created" });
          }
        } else {
          return reject({ message: "File or directory already exists" });
        }
      } catch (error) {
        return reject({ message: "File error", error });
      }
    });
  }

  deleteFile(file) {
    const path = this.getPath(file)
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    return process.env.FILE_PATH + '\\' + file.room + '\\' + file.path
  }
}

module.exports = new FileService();
