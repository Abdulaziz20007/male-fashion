const Cart_items = require("../schema/Cart_items");
const { errorHandler } = require("../helpers/error_handler");
const {
  cart_itemsValidation,
} = require("../validations/cart_items.validation");

const getCart_items = async (req, res) => {
  try {
    const cart_items = await Cart_items.find();
    res.status(200).send(cart_items);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCart_itemsById = async (req, res) => {
  try {
    const cart_items = await Cart_items.findById(req.params.id);
    if (!cart_items) {
      return res.status(404).send({ error: "Cart_items topilmadi" });
    }
    res.status(200).send(cart_items);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createCart_items = async (req, res) => {
  try {
    const { error, value } = cart_itemsValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const cart_items = await Cart_items.create(value);
    res.status(201).send(cart_items);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCart_itemsById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldCart_items = await Cart_items.findById(id);
    if (!oldCart_items) {
      return res.status(404).send({ error: "Cart_items topilmadi" });
    }
    oldCart_items = { ...oldCart_items, ...req.body };
    const { error, value } = cart_itemsValidation(oldCart_items);
    if (error) {
      errorHandler(error, res);
    }

    const cart_items = await Cart_items.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send(cart_items);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCart_itemsById = async (req, res) => {
  try {
    const cart_items = await Cart_items.findById(req.params.id);
    if (!cart_items) {
      return res.status(404).send({ error: "Cart_items topilmadi" });
    }
    await Cart_items.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Cart_items deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getCart_items,
  getCart_itemsById,
  createCart_items,
  updateCart_itemsById,
  deleteCart_itemsById,
};
