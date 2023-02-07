const User = require("../models/User.model");
const Room = require("../models/Room.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileService = require("../services/file.service");
const File = require("../models/File.model");

module.exports.userController = {
  registration: async (req, res) => {
    const { login, password, name, email, avatar } = req.body;

    try {
      const hash = await bcrypt.hash(password, +process.env.BCRYPT_ROUNDS);
      const user = new User({
        password: hash,
        login,
        name,
        email,
        avatar,
      });
      await user.save();
      await fileService.createDir(new File({ user: user.id, name: "" }));
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if (!candidate) {
      return res.status(401).json("Неверный логин");
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };
    const user = candidate;

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "7d",
    });

    return res.json({ token, user });
  },
  getUser: async (req, res) => {
    const data = await User.find();
    res.json(data);
  },
  deleteUser: async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    res.json(data);
  },
  addUserRoom: async (req, res) => {
    const room = await Room.findById(req.params.id);
    const user = await User.findById(req.body._id);

    const data = await room.update({ $push: { access: user } });

    res.json(data);
  },
};
