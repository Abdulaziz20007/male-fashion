const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const PORT = config.get("port");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.engine("ejs", ejs.__express);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("views"));

const apiRouter = require("./routes/index.routes");
const viewsRouter = require("./routes/view.routes");
app.use("/api", apiRouter);
app.use("/", viewsRouter);

app.listen(PORT, async () => {
  await mongoose.connect(config.get("dbUri"));
  console.log(`Server is running on port ${PORT}`);
});
