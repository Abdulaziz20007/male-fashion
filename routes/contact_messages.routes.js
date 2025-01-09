const router = require("express").Router();
const {
  getContact_messages,
  getContact_messagesById,
  createContact_messages,
  updateContact_messagesById,
  deleteContact_messagesById,
} = require("../controllers/contact_messages.controller");

router.get("/", getContact_messages);
router.get("/:id", getContact_messagesById);
router.post("/", createContact_messages);
router.put("/:id", updateContact_messagesById);
router.delete("/:id", deleteContact_messagesById);

module.exports = router;
