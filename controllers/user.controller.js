const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  changeUser: async (req, res) => {
    const { login, password, name, email, avatar } = req.body;

    const data = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        avatar,
      },
      { new: true }
    );
    res.json(data);
  },
};
