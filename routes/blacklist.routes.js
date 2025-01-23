const express = require("express");
const router = express.Router();
const { adminGuard } = require("../middleware/admin.guard");

const {
  addBlacklistUser,
  getBlacklistUsers,
  getBlacklistUserById,
  updateBlacklistUserById,
  deleteBlacklistUserById,
} = require("../controllers/blacklist.controller");

router.post("/", adminGuard, addBlacklistUser);

router.get("/", adminGuard, getBlacklistUsers);
router.get("/:id", adminGuard, getBlacklistUserById);

router.put("/:id", adminGuard, updateBlacklistUserById);

router.delete("/:id", adminGuard, deleteBlacklistUserById);

module.exports = router;
