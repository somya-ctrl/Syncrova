const mongoose = require("mongoose");
const channelRepo = require('../repositories/channels.repository');

const createChannelService = async (userId, name, serverId, type) => {
  if (!name || !serverId) {
    throw new Error("name and serverId are required");
  }
  const channel = await channelRepo.createChannel({
    name,
    type,
    serverId,
    createdBy: userId
  });
   return channel;
};

const createChannelInServerService = async (userId, serverId, name, type) => {

  if (!name) {
    throw new Error("name is required");
  }
  const server = await channelRepo.findServerById(serverId);
  if (!server) {
    throw new Error("server not found");
  }
  const isMember = server.members.some((m) => m.toString() === userId);
  if (!isMember) {
    throw new Error("access denied");
  }
  const channel = await channelRepo.createChannel({
    name,
    type: type || "text",
    serverId,
    createdBy: userId
  });

  server.channels.push(channel._id);
  await channelRepo.saveServer(server);

  return {
    message: "Channel created successfully",
    channel
  };
};

const getChannelsInServerService = async (serverId) => {

  if (!mongoose.Types.ObjectId.isValid(serverId)) {
    throw new Error("Invalid serverId");
  }

  return await channelRepo.findChannelsByServerId(serverId);
};

const deleteChannelService = async (userId, channelId) => {

  const channel = await channelRepo.findChannelById(channelId);

  if (!channel) {
    throw new Error("Channel not found");
  }

  const server = await channelRepo.findServerById(channel.serverId);

  if (!server) {
    throw new Error("server not found");
  }
  if (server.ownerId.toString() !== userId) {
    throw new Error("Only server owner can delete channel");
  }

  await channelRepo.deleteChannelById(channelId);

  server.channels = server.channels.filter(
    (id) => id.toString() !== channelId
  );

  await channelRepo.saveServer(server);

  return { message: "Channel deleted successfully" };
};

module.exports = {
  createChannelService,
  createChannelInServerService,
  getChannelsInServerService,
  deleteChannelService
};
