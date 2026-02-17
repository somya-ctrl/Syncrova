const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { sendMessage, getmessage, editmessage ,deleteMessage} = require('../controllers/message.controller');

router.post("/:id", auth, sendMessage);
router.get("/:id", auth, getmessage);
router.patch("/:id", auth, editmessage);
router.delete("/:id", auth, deleteMessage);

module.exports = router;
