const Server = require('../models/server.model');
const Channel = require('../models/channels.model');
const Message = require('../models/message.model');

const createServerRepo = async (data) => {
  return await Server.create(data);
};

const findServerByIdRepo = async (serverId) => {
  return await Server.findById(serverId);
};

const saveServerRepo = async (server) => {
  return await server.save();
};

const aggregateServersRepo = async (pipeline) => {
  return await Server.aggregate(pipeline);
};

const deleteServerByIdRepo = async (serverId) => {
  return await Server.findByIdAndDelete(serverId);
};

const deleteChannelsByServerRepo = async (serverId) => {
  return await Channel.deleteMany({ serverId });
};

const deleteMessagesByServerRepo = async (serverId) => {
  const channels = await Channel.find({ serverId });
  const channelIds = channels.map(ch => ch._id);

  return await Message.deleteMany({ channelId: { $in: channelIds } });
};
module.exports = {
  createServerRepo,
  findServerByIdRepo,
  saveServerRepo,
  aggregateServersRepo,
  deleteServerByIdRepo,
  deleteChannelsByServerRepo,
  deleteMessagesByServerRepo
};
