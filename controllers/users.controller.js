const User = require("../schema/User");
const { errorHandler } = require("../helpers/error_handler");
const { userValidation } = require("../validations/user.validation");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const jwt = require("../services/jwt_service");
const config = require("config");
const { v4: uuidv4 } = require("uuid");
const mailService = require("../services/mail.service");

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

    const verification = uuidv4();
    value.verification = verification;

    await mailService.sendMailActivationCode(value.email, verification);

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

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "Email yoki parol noto'g'ri" });
    }
    const isPasswordCorrect = comparePassword(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).send({ error: "Email yoki parol noto'g'ri" });
    }
    if (!user.is_active) {
      return res.status(404).send({ error: "User aktivatsiya qilinmagan" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
    };

    const tokens = jwt.generateTokens(payload);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: config.get("cookieTime"),
    });
    await User.findByIdAndUpdate(user._id, {
      refreshToken: tokens.refreshToken,
    });
    res.status(200).send({ accessToken: tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  res.status(200).send({ message: "Logout successful" });
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const tokens = jwt.generateTokens(payload);

  await User.findByIdAndUpdate(payload.id, {
    refreshToken: tokens.refreshToken,
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: config.get("cookieTime"),
  });

  res.status(200).send({ accessToken: tokens.accessToken });
};

const verifyUser = async (req, res) => {
  const user = await User.findOne({ verification: req.params.id });
  if (!user) {
    return res.status(404).send({ error: "User topilmadi" });
  }
  if (user.isVerified) {
    return res.status(400).send({ error: "User aktivatsiya qilingan" });
  }
  await User.findByIdAndUpdate(user._id, {
    isVerified: true,
  });
  res.status(200).send({ message: "User aktivatsiya qilindi" });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
  logout,
  refreshToken,
  verifyUser,
};
