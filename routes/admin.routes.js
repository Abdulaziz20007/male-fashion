const { getAdmin, getAdminById, addAdmin, updateAdminById, deleteAdminById, loginAdmin, logoutAdmin, refreshAdminToken } = require("../controllers/admin.controller")

const adminRouter = require("express").Router()

adminRouter.get("/logout", logoutAdmin)
adminRouter.get("/refresh", refreshAdminToken)
adminRouter.get("/", getAdmin)
adminRouter.get("/:id", getAdminById)
adminRouter.post("/", addAdmin)
adminRouter.post("/login", loginAdmin)
adminRouter.put("/:id", updateAdminById)
adminRouter.delete("/:id", deleteAdminById)

module.exports = adminRouter;
=======
const express = require("express");
const router = express.Router();
const { adminGuard } = require("../middleware/admin.guard");

const {
  addAdmin,
  getAdmins,
  deleteAdminById,
  updateAdminById,
  getAdminById,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
} = require("../controllers/admin.controller");

router.post("/", adminGuard, addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh", refreshAdminToken);

router.get("/", adminGuard, getAdmins);
router.get("/:id", adminGuard, getAdminById);

router.put("/:id", adminGuard, updateAdminById);

router.delete("/:id", adminGuard, deleteAdminById);

module.exports = router;
