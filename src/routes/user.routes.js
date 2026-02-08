const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");
const { getuser, updateuser, updatestatus } = require('../controllers/user.controller');

router.get("/me", auth, getuser);
router.patch("/update", auth, updateuser);
router.patch("/status", auth, updatestatus);

module.exports = router;
