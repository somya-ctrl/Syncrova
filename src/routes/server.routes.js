const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");
const validate = require("../middlewares/validate.middleware");
const { createServerSchema } = require("../validations/server.validation");
const {
  createServer,
  getserver,
  getserverbyid,
  joinServer,
  leaveServer,
  deleteServer
} = require('../controllers/server.controller');

router.post("/", auth,validate(createServerSchema), createServer);
router.get("/", auth, getserver);
router.get("/:id", auth, getserverbyid);

router.post("/:id/join", auth, joinServer);
router.post("/:id/leave", auth, leaveServer);
router.delete("/:id", auth, deleteServer);

module.exports = router;
