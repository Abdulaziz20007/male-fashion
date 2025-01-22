const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler.js");
const Blacklist = require("../schemas/blacklist_schema");

const addBlacklistUser = async (req, res) => {
  try {
    const { user_id, email, reason, admin_id } = req.body;
    const newBan = await Blacklist.create({ user_id, email, reason, admin_id });
    res.status(201).send({ message: "User banned", newBan });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getBlacklistUsers = async (req, res) => {
  try {
    const blacklistUsers = await Blacklist.find();
    res.send({ blacklistUsers });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getBlacklistUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const blacklistUser = await Blacklist.findOne({ _id: id });
    if (!blacklistUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ blacklistUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateBlacklistUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, email, reason, admin_id } = req.body;

    const updatedBlacklistUser = await Blacklist.updateOne(
      { _id: id },
      {
        $set: { user_id, email, reason, admin_id },
      }
    );

    res.send({ message: "Blacklist user updated successfully", updatedBlacklistUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteBlacklistUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const deletedBlacklistUser = await Blacklist.deleteOne({ _id: id });
    res.send({ message: "Blacklist user deleted successfully", deletedBlacklistUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addBlacklistUser,
  getBlacklistUsers,
  getBlacklistUserById,
  updateBlacklistUserById,
  deleteBlacklistUserById,
};