const express= require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { signup,login,refresh,logout,getuser} = require('../controllers/user');
router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh',refresh);
router.post('/logout',logout);
//users
router.get("/me", auth, getuser);

module.exports= router