const router = require("express").Router();
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");

router.use("/users", userRouter);
router.use("/products", productRouter);

module.exports = router;
