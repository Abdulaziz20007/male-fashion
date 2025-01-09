const router = require("express").Router();
const {
  getCart_items,
  getCart_itemsById,
  createCart_items,
  updateCart_itemsById,
  deleteCart_itemsById,
} = require("../controllers/cart_items.controller");

router.get("/", getCart_items);
router.get("/:id", getCart_itemsById);
router.post("/", createCart_items);
router.put("/:id", updateCart_itemsById);
router.delete("/:id", deleteCart_itemsById);

module.exports = router;
