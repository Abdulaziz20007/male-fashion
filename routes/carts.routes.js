const router = require("express").Router();
const {
  getCarts,
  getCartsById,
  createCarts,
  updateCartsById,
  deleteCartsById,
} = require("../controllers/carts.controller");

router.get("/", getCarts);
router.get("/:id", getCartsById);
router.post("/", createCarts);
router.put("/:id", updateCartsById);
router.delete("/:id", deleteCartsById);

module.exports = router;
