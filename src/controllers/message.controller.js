const Message = require('../models/message');
const Channel = require('../models/channels');
const Server = require('../models/server');
const mongoose = require('mongoose');
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

module.exports = { sendMessage, getmessage, editmessage };
