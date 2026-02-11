const Channel = require('../models/channels.model');
const Server = require('../models/server.model');
const mongoose = require("mongoose");

const createChannel = async (data) => {
  return await Channel.create(data);
};

const findServerById = async (serverId) => {
  return await Server.findById(new mongoose.Types.ObjectId(serverId));
};

const findChannelsByServerId = async (serverId) => {
  return await Channel.find({ serverId: new mongoose.Types.ObjectId(serverId) });
};

const findChannelById = async (channelId) => {
  return await Channel.findById(channelId);
};

const deleteChannelById = async (channelId) => {
  return await Channel.findByIdAndDelete(channelId);
};

const saveServer = async (server) => {
  return await server.save();
};
module.exports = {
  createChannel,
  findServerById,
  findChannelsByServerId,
  findChannelById,
  deleteChannelById,
  saveServer
};