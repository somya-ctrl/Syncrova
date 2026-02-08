const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { sendMessage, getmessage, editmessage } = require('../controllers/message.controller');


router.post("/channels/:id/messages", auth, sendMessage);
router.get("/channels/:id/messages", auth, getmessage);
router.patch("/messages/:id", auth, editmessage);

module.exports = router;
