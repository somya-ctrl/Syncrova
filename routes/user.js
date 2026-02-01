const express= require('express');
const router = express.Router();
const auth = require("../middlewares/authmiddlewares");

const { signup,login,refresh,logout,getuser,updateuser,updatestatus,sendMessage,createChannel,getmessage,
    createServer,getserver,getserverbyid,createchannelinserver,getchannelinserver} = require('../controllers/user');
router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh',refresh);
router.post('/logout',logout);

router.get("/me", auth, getuser);
router.patch("/update",auth,updateuser);
router.patch("/status",auth,updatestatus);

router.post("/channels",auth,createChannel);
router.post("/channels/:id/messages",auth,sendMessage);
router.get("/channels/:id/messages",auth,getmessage);

router.post("/servers",auth,createServer);
router.get("/getservers",auth,getserver);
router.get("/servers/:id",auth,getserverbyid);
router.post("/servers/:id/channels",auth,createchannelinserver);
router.get("/servers/:id/getchannels",auth,getchannelinserver);

module.exports= router