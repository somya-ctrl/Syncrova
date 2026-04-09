const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddlewares');
const validate = require("../middlewares/validate.middleware");
const { signupSchema, loginSchema } = require("../validations/auth.validation");
const { signup, login, refresh, logout } = require('../controllers/auth.controller');


router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', auth ,logout);

module.exports = router;
