const { errorHandler } = require("../helpers/error_handler");
const config = require("config");
const jwt = require("../services/jwt_service");

const userGuard = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const header = req.headers.authorization.split(" ");
    if (header.length !== 2 || header[0] !== "Bearer") {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const token = header[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    if (token.split(".").length !== 3) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verifyAccessToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    errorHandler(err, res);
  }
};

const userSelfGuard = (req, res, next) => {
  try {
    if (req.user._id === req.params.id) {
      next();
    } else {
      res.status(403).send({ error: "Forbidden" });
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = { userGuard, userSelfGuard };
