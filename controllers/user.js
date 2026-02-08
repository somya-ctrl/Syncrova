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
                res.status(401).json({error:"Invalid Credentials"});        
              }
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
      inviteCode:invitecode

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
async function getserver(req,res){
  try{
    const userId = req.user.id;
    const servers = await Server.aggregate([
      { $match: { members:new mongoose.Types.ObjectId(userId)}},
      {
        $addFields:{
          memberCount:{ $size:"$members"},
          channelCount:{$size:"$channels"}
        }
      },
      {
        $project:{
          name:1,
          icon:1,
          ownerId:1,
          invitecode:1,
          memberCount:1,
          channelCount:1,
          createdAt:1
        }
      },
      {$sort:{createdAt:-1}}
      
    ]);
    res.status(200).json(servers);
  }
  catch(error){
       res.status(500).json({error:error.message});
  }
}
async function getserverbyid(req,res){
  try{
    const serverId = new mongoose.Types.ObjectId(req.params.id);
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const result = await Server.aggregate([
      {$match:{_id:serverId,members:userId}},
      {
        $lookup:{
          from:"users",
          localField:"ownerId",
          foreignField:"_id",
          as:"owner"
        }
      },
      {$unwind:"$owner"},
      {
        $addFields: {
          membersCount: { $size: "$members" },
          channelsCount: { $size: "$channels" }
        }
      },
      {
        $project: {
          name: 1,
          icon: 1,
          inviteCode: 1,
          createdAt: 1,

          "owner._id": 1,
          "owner.username": 1,
          "owner.avatar": 1,

          membersCount: 1,
          channelsCount: 1
        }
      }
    ]);
    if (!result.length) { return res.status(404).json({ error: "Server not found or access denied" });}
    res.status(200).json(result[0]);}
     
  catch(error){
    res.status(500).json({error:error.message});
  }
}
async function createchannelinserver(req,res){
  try{
     const serverId = req.params.id;
     const userId = req.user.id;
     const{name,type}=req.body;
     if(!name){
      return res.status(400).json({error:"name is required"});
     }
     const server = await Server.findById(serverId);
     if(!server){
      return res.status(404).json({error:"server not found"});
     }
     const isMember = server.members.some((m)=> m.toString() ===userId);
      if(!isMember){
        return res.status(403).json({error:"access denied"});
      }
     const channel = await Channel.create({
        name,
        type: type || "text",
        serverId,
        createdBy:userId
      });
      server.channels.push(channel._id);
      await server.save();
      res.status(201).json({
      message: "Channel created successfully",
      channel
    });
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
}
async function getchannelinserver(req,res){
  try{
    const serverId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(serverId)) {
      return res.status(400).json({ error: "Invalid serverId" });
    }
    const channels = await Channel.find({serverId});
    res.status(200).json(channels);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
}


async function joinServer(req, res) {
  try {
    const serverId = req.params.id;
    const userId = req.user.id; 

    const server = await Server.findById(serverId);

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    if (server.members.includes(userId)) {
      return res.status(400).json({ error: "User already joined this server" });
    }
    server.members.push(userId);
    await server.save();

    return res.status(200).json({
      message: "Joined server successfully",
      server,
    });
  } catch (error) {
    console.log("joinServer error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function leaveServer(req,res){
  try{
    const serverId = req.params.id;
    const userId = req.user.id;
    const server = await Server.findById(serverId);

    if(!server){
      return res.status(400).json({error : "Server not found"});
    }
    if (!server.members.includes(userId)) {
      return res.status(400).json({ error: "you are not member of the server" });
    }
    if (server.ownerId.toString() === userId) {
      return res.status(400).json({ error: "Server owner cannot leave the server" });
    }
    server.members = server.members.filter(
      (member) => member.toString() !== userId
    );

    await server.save();

    return res.status(200).json({
      message: "Left server successfully"
    });

  } catch (error) {
    console.log("leaveServer error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteChannel(req,res){
  try{
    const channelId = req.params.id;
    const userId = req.user.id;
    const channel = await Channel.findById(channelId);
    if(!channel){
      return res.status(400).json({error : "Channel not found"});
    }
    
    const serverId = channel.serverId;
    const server = await Server.findById(serverId);
    if(!server){
      return res.status(400).json({error : "server not found"});
    }
    if(server.ownerId.toString() !== userId){
    return res.status(403).json({error:"Only server owner can delete channel"});
    }
    
   await Channel.findByIdAndDelete(channelId);


   server.channels = server.channels.filter(
  (id) => id.toString() !== channelId
);
   await server.save();
  return res.status(200).json({
  message: "Channel deleted successfully"
});
 }
  catch(error){
      return res.status(500).json({error:"internal server error"});
  }
}




async function editmessage(req,res){
  try{
      const messageId = req.params.id;
     const {content} = req.body;
     const userId = req.user.id;
     const message = await Message.findById(messageId);
     if(!message){
      return res.status(404).json({error:"message not found"});
     }
     const channelId = message.channelId;
     const channel = await Channel.findById(channelId);
     const serverId = channel.serverId;
     const server = await Server.findById(serverId);
     if(!channel){
      return res.staus(404).json({error:"channel not found"});
     }
     if(!server){
      return res.status(404).json({error:"server not found"});
     }
      if(
       message.sender.toString() !== userId &&
       server.ownerId.toString() !== userId
      ){
      return res.status(403).json({error:"Not allowed to edit this message"});
      }
     message.content = content;
     await message.save();
     
     return res.status(200).json({
      message: "Message updated successfully",
      updatedMessage: message
     });
  }
     
   catch(error){
    return res.status(500).json({error:"internal server error"});
   } 

}
module.exports = {signup,login,refresh,logout,getuser,updateuser,updatestatus,sendMessage,createChannel,
  getmessage,createServer,getserver,getserverbyid,createchannelinserver,getchannelinserver,joinServer,leaveServer,deleteChannel,editmessage};