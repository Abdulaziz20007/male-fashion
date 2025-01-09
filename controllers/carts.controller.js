const Carts = require("../schema/Carts");
const { errorHandler } = require("../helpers/error_handler");
const { cartsValidation } = require("../validations/carts.validation");

const getCarts = async (req, res) => {
  try {
    const carts = await Carts.find();
    res.status(200).send(carts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCartsById = async (req, res) => {
  try {
    const carts = await Carts.findById(req.params.id);
    if (!carts) {
      return res.status(404).send({ error: "Carts topilmadi" });
    }
    res.status(200).send(carts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createCarts = async (req, res) => {
  try {
    const { error, value } = cartsValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const carts = await Carts.create(value);
    res.status(201).send(carts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCartsById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldCarts = await Carts.findById(id);
    if (!oldCarts) {
      return res.status(404).send({ error: "Carts topilmadi" });
    }
    oldCarts = { ...oldCarts, ...req.body };
    const { error, value } = cartsValidation(oldCarts);
    if (error) {
      errorHandler(error, res);
    }

    const carts = await Carts.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send(carts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCartsById = async (req, res) => {
  try {
    const carts = await Carts.findById(req.params.id);
    if (!carts) {
      return res.status(404).send({ error: "Carts topilmadi" });
    }
    await Carts.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Carts deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getCarts,
  getCartsById,
  createCarts,
  updateCartsById,
  deleteCartsById,
};
