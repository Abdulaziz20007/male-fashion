const bcrypt = require("bcrypt");
const config = require("config");
const round = config.get("bcryptRound");

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, round);
  },
  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
};
