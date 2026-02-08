const Server = require('../models/server');
const Channel = require('../models/channels');
const mongoose = require('mongoose');
const crypto = require('crypto');

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



module.exports = {
  createServer,
  getserver,
  getserverbyid,
  joinServer,
  leaveServer
};
