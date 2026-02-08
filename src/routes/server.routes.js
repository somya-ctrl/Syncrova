const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const {
  createServer,
  getserver,
  getserverbyid,
  createchannelinserver,
  getchannelinserver,
  joinServer,
  leaveServer
} = require('../controllers/user');

router.post("/", auth, createServer);
router.get("/", auth, getserver);
router.get("/:id", auth, getserverbyid);

router.post("/:id/channels", auth, createchannelinserver);
router.get("/:id/channels", auth, getchannelinserver);

router.post("/:id/join", auth, joinServer);
router.post("/:id/leave", auth, leaveServer);

module.exports = router;
