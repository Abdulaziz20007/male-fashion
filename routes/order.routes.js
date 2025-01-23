const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder

} = require("../controllers/orders.controller");

const router = require("express").Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
