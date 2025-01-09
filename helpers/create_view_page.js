const path = require("node:path");

const createViewPage = (page) =>
  path.resolve(__dirname, "../views", `${page}.ejs`);

module.exports = {
  createViewPage,
};
