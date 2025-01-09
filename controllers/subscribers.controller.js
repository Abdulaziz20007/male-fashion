const Subscriber = require("../schema/Subscriber");

const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).send({ error: "Email mavjud" });
    }

    const newSubscriber = await Subscriber.create({ email });
    res.status(201).send({
      msg: "Subscriber muvaffaqiyatli yaratildi",
      subscriber: newSubscriber,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      return res.status(404).send({ msg: "Subscriber topilmadi" });
    }
    const updatedSubscriber = await Subscriber.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      msg: "Subscriber muvaffaqiyatli o'zgartirildi",
      subscriber: updatedSubscriber,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscriber.findByIdAndDelete(id);
    res.status(200).send({ msg: "Subscriber muvaffaqiyatli o'chirildi" });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createSubscriber,
  getSubscribers,
  updateSubscriber,
  deleteSubscriber,
};
