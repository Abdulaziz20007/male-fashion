const router = require("express").Router();
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const cartsRouter = require("./carts.routes");
const cart_itemsRouter = require("./cart_items.routes");
const contact_messagesRouter = require("./contact_messages.routes");
const orderRouter = require("./order.routes");
const order_itemRouter = require("./order_item.routes");
const adminRouter = require("./admin.routes");

router.use("/admin", adminRouter)
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartsRouter);
router.use("/cart_items", cart_itemsRouter);
router.use("/contact_messages", contact_messagesRouter);
router.use("/orders", orderRouter);
router.use("/order_items",order_itemRouter );

module.exports = router;
