const Contact_messages = require("../schema/Contact_messages");
const { errorHandler } = require("../helpers/error_handler");
const {
  contact_messagesValidation,
} = require("../validations/contact_messages.validation");

const getContact_messages = async (req, res) => {
  try {
    const contact_messages = await Contact_messages.find();
    res.status(200).send(contact_messages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContact_messagesById = async (req, res) => {
  try {
    const contact_messages = await Contact_messages.findById(req.params.id);
    if (!contact_messages) {
      return res.status(404).send({ error: "Contact_messages topilmadi" });
    }
    res.status(200).send(contact_messages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createContact_messages = async (req, res) => {
  try {
    const { error, value } = contact_messagesValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const contact_messages = await Contact_messages.create(value);
    res.status(201).send(contact_messages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContact_messagesById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldContact_messages = await Contact_messages.findById(id);
    if (!oldContact_messages) {
      return res.status(404).send({ error: "Contact_messages topilmadi" });
    }
    oldContact_messages = { ...oldContact_messages, ...req.body };
    const { error, value } = contact_messagesValidation(oldContact_messages);
    if (error) {
      errorHandler(error, res);
    }

    const contact_messages = await Contact_messages.findByIdAndUpdate(
      id,
      value,
      {
        new: true,
      }
    );
    res.status(200).send(contact_messages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContact_messagesById = async (req, res) => {
  try {
    const contact_messages = await Contact_messages.findById(req.params.id);
    if (!contact_messages) {
      return res.status(404).send({ error: "Contact_messages topilmadi" });
    }
    await Contact_messages.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Contact_messages deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getContact_messages,
  getContact_messagesById,
  createContact_messages,
  updateContact_messagesById,
  deleteContact_messagesById,
};
