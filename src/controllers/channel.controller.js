const mongoose = require("mongoose");
const Channel = require('../models/channels.model');
const Server = require('../models/server.model');

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



module.exports = {
  createChannel,
  deleteChannel,
  createchannelinserver,
  getchannelinserver
};