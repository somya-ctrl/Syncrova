const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { sendMessage, getmessage, editmessage } = require('../controllers/message.controller');

router.post("/:id", auth, sendMessage);
router.get("/:id", auth, getmessage);
router.patch("/:id", auth, editmessage);

module.exports = router;
