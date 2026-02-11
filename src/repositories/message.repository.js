const Message = require('../models/message.model');
const Channel = require('../models/channels.model');
const Server = require('../models/server.model');
const mongoose = require('mongoose');

const createMessage = async (data) => {
  return await Message.create(data);
};
const findMessageById = async (messageId) => {
  return await Message.findById(messageId);
};
const findChannelById = async (channelId) => {
  return await Channel.findById(channelId);
};


const findServerById = async (serverId) => {
  return await Server.findById(new mongoose.Types.ObjectId(serverId));
};

const saveMessage = async (message) => {
  return await message.save();
};
const getMessagesAggregate = async (channelId, skip, limit) => {

  return await Message.aggregate([
    { $match: { channelId: new mongoose.Types.ObjectId(channelId) } },

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
};

module.exports = {
  createMessage,
  findMessageById,
  findChannelById,
  findServerById,
  saveMessage,
  getMessagesAggregate
};
