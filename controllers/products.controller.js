const Product = require("../schema/Product");
const { errorHandler } = require("../helpers/error_handler");
const { productValidation } = require("../validations/product.validation");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product topilmadi" });
    }
    res.status(200).send(product);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const product = await Product.create(value);
    res.status(201).send(product);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      return res.status(404).send({ error: "Product topilmadi" });
    }
    oldProduct = { ...oldProduct, ...req.body };
    const { error, value } = productValidation(oldProduct);
    if (error) {
      errorHandler(error, res);
    }

    const product = await Product.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send(product);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product topilmadi" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
