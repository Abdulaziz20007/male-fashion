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
