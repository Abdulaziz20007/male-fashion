const User = require("../schema/User");
const { errorHandler } = require("../helpers/error_handler");
const { userValidation } = require("../validations/user.validation");
const { hashPassword } = require("../helpers/bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User topilmadi" });
    }
    res.status(200).send(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    value.password = hashPassword(value.password);
    const user = await User.create(value);
    res.status(201).send(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).send({ error: "User topilmadi" });
    }
    oldUser = { ...oldUser, ...req.body };
    const { error, value } = userValidation(oldUser);
    if (error) {
      errorHandler(error, res);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User topilmadi" });
    }
    res.status(200).send(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User topilmadi" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
