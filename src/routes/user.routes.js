const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");
const { getuser, updateuser, updatestatus } = require('../controllers/user.controller');
const validate = require("../middlewares/validate.middleware");
const { updateUserSchema, updateStatusSchema } = require("../validations/user.validation");

router.get("/me", auth, getuser);
router.patch("/update", auth,validate(updateUserSchema), updateuser);
router.patch("/status", auth,validate(updateStatusSchema), updatestatus);

module.exports = router;
