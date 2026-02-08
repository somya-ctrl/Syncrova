const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const {
  createChannel,
  deleteChannel,
  createchannelinserver,
  getchannelinserver
} = require('../controllers/channel.controller');


router.post("/", auth, createChannel);
router.delete("/:id", auth, deleteChannel);

router.post("/:id/channels", auth, createchannelinserver);
router.get("/:id/channels", auth, getchannelinserver);


module.exports = router;
