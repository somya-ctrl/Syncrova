const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require("mongoose");
const User = require('../models/auth');
const Message = require("../models/message");
const Refreshtoken = require('../models/refreshtoken');
const Server = require("../models/server");
const Channel =require('../models/channels');
const jwt = require('jsonwebtoken');
async function signup(req,res){
    try{
         const user = new User(req.body);
         const saltrounds = 10;
         const hashedpassword = await bcrypt.hash(user.password,saltrounds);
         user.password = hashedpassword;
         const accesstoken = jwt.sign(
            {id:user._id,
            email:user.email
            },process.env.JWT_SECRET,
            {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
            }
         );
         const refreshtoken = crypto.randomBytes(54).toString("hex");
         await Refreshtoken.create({
            user:user._id,
            token:refreshtoken,
            expiresAt: new Date(Date.now() + 7*24*60*60*1000),

         });
         await user.save();
         res.status(201).json({
            message:"signup successfull",
            accesstoken,
            refreshtoken,
            user
         });
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}  
    async function login(req,res){
        try{
            const{email,password } = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({error:"user not found"});
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(401).json({error:"Invalid Credentials"});            }
           const accesstoken = jwt.sign(
            {id :user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN||"15m"}
           );
           const refreshtoken = crypto.randomBytes(54).toString("hex");
           await Refreshtoken.create({
            user:user._id,
        token:refreshtoken,
    expiresAt: new Date(Date.now()+ 7*24*60*60*1000),
           });
           res.status(200).json({
            message:"login successfull",
            accesstoken,
            refreshtoken,
            user:{id :user._id,name:user.username,email:user.email},
           });
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
async function refresh(req,res){
    try{
        const {refreshtoken} = req.body;
        if(!refreshtoken)
            return res.status(400).json({error:"refreshtoken is required"});
        const tokenDoc = await Refreshtoken.findOne({token:refreshtoken});
        if(!tokenDoc)
            return res.status(403).json({error:"invalid refreshtoken"});
        
        if (tokenDoc.expiresAt < new Date()) {
        await tokenDoc.deleteOne();
        return res.status(403).json({ error: "Refresh token expired" });
        }

        const accesstoken = jwt.sign(
            {id:tokenDoc.user},
            process.env.JWT_SECRET,
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN || "15m"}
        );
        res.status(200).json({accesstoken});
    }catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    await Refreshtoken.deleteOne({ token: refreshToken });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async  function getuser (req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
async function updateuser(req,res){
    try{
      const updates = {};
       if (req.body.username) updates.username = req.body.username;
       if (req.body.avatar) updates.avatar = req.body.avatar;
        const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
    }
 async function updatestatus(req, res) {
  try {
    const { status } = req.body;

    const allowed = ["online", "offline", "busy", "dnd"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { status },
      { new: true }
    ).select("username status");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createChannel(req, res) {
  try {
    const { name, serverId, type } = req.body;

    if (!name || !serverId) {
      return res.status(400).json({
        error: "name and serverId are required"
      });
    }

    const channel = await Channel.create({
      name,
      type,               
      serverId,             
      createdBy: req.user.id 
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



async function getmessage(req, res) {
  try {
    const channelId = new mongoose.Types.ObjectId(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await Message.aggregate([
  
      { $match: { channelId } },

      { $sort: { createdAt: 1 } },
       { $skip: skip },
      { $limit: limit },

      
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender"
        }
      },

      
      { $unwind: "$sender" },

      {
        $project: {
          content: 1,
          channelId: 1,
          createdAt: 1,
          "sender._id": 1,
          "sender.username": 1,
          "sender.avatar": 1
        }
      }
    ]);

    res.status(200).json({page,
      limit,
      count: messages.length,
      messages});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function sendMessage(req, res) {
  try {
    const { content } = req.body;
    const channelId = req.params.id;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ error: "Message required" });
    }

    const message = await Message.create({
      content,
      channelId,
      senderId: userId
    });
    if (req.io) {
      req.io.to(channelId).emit("newMsg", message);
    }
   return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
async function createServer(req,res){
  try{
    const {name,icon}=req.body;
    if(!name){
      return res.status(400).json({ error: "name is required" });
    }
    const userId = req.user.id;
    const invitecode = crypto.randomBytes(6).toString('hex');
    const server = await Server.create({
      name,
      icon: icon|| "",
      ownerId:userId,
      members:[userId],
      invitecode

    });
    const channel = await Channel.create({
      name: "general",
      type: "text",
      serverId: server._id,
      createdBy: userId
    });
        server.channels.push(channel._id);
    await server.save();

    res.status(201).json({
      message: "Server created successfully",
      server,
      defaultChannel: channel
    });
  }
  catch(error){
      res.status(500).json({ error: error.message });
  
  }
}


module.exports = {signup,login,refresh,logout,getuser,updateuser,updatestatus,sendMessage,createChannel,getmessage,createServer};