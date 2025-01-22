const express = require("express").Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

express.post("/", createCategory);
express.get("/", getCategories);
express.put("/:id", updateCategory);
express.delete("/:id", deleteCategory);

module.exports = express;
