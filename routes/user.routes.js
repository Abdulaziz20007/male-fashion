const router = require("express").Router();
const { userGuard, userSelfGuard } = require("../middleware/user.guard");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
  logout,
  refreshToken,
} = require("../controllers/users.controller");

router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", userGuard, logout);

router.get("/", getUsers);
router.get("/:id", userGuard, userSelfGuard, getUserById);
router.post("/", createUser);
router.put("/:id", userGuard, userSelfGuard, updateUserById);
router.delete("/:id", userGuard, userSelfGuard, deleteUserById);

module.exports = router;
