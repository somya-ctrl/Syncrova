const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const {
  createChannel,
  deleteChannel
} = require('../controllers/user');

router.post("/", auth, createChannel);
router.delete("/:id", auth, deleteChannel);

module.exports = router;
