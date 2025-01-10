const express = require("express").Router();
const {
  createSubscriber,
  getSubscribers,
  updateSubscriber,
  deleteSubscriber,
} = require("../controllers/subscribers.controller");

express.post("/", createSubscriber);
express.get("/", getSubscribers);
express.put("/:id", updateSubscriber);
express.delete("/:id", deleteSubscriber);

module.exports = express;
