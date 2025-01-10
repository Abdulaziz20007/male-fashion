const Category = require("../schema/Category");
const { errorHandler } = require("../helpers/error_handler");
const { categoryValidation } = require("../validations/category.validation");

const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const { name, description } = value;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({ error: "Category mavjud" });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).send({
      msg: "Category muvaffaqiyatli yaratildi",
      category: newCategory,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ error: "Category topilmadi" });
    }

    const { error, value } = categoryValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({
      msg: "Category muvaffaqiyatli yangilandi",
      category: updatedCategory,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ error: "Category topilmadi" });
    }
    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .send({ msg: "Category muvaffaqiyatli o'chirildi", category });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
