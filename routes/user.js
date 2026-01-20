const express= require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { signup,login,refresh,logout,getuser,updateuser,updatestatus,sendMessage,createChannel} = require('../controllers/user');
router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh',refresh);
router.post('/logout',logout);
//users
router.get("/me", auth, getuser);
router.patch("/update",auth,updateuser);
router.patch("/status",auth,updatestatus);
router.post("/channels",auth,createChannel);
router.post("/channels/:id/messages",auth,sendMessage);
module.exports= router