const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");
const validate = require("../middlewares/validate.middleware")
const { sendMessageSchema, editMessageSchema } = require("../validations/message.validation");
const { sendMessage, getmessage, editmessage ,deleteMessage} = require('../controllers/message.controller');

router.post("/:id", auth, validate(sendMessageSchema), sendMessage);
router.get("/:id", auth, getmessage);
router.patch("/:id", auth, validate(editMessageSchema), editmessage);
router.delete("/:id", auth, deleteMessage);

module.exports = router;
