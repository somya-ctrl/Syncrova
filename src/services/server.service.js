const mongoose = require('mongoose');
const crypto = require('crypto');
const serverRepo = require('../repositories/server.repository');
const Channel = require('../models/channels.model');

const createServerService = async (userId, name, icon) => {

  if (!name) throw new Error("name is required");

  const invitecode = crypto.randomBytes(6).toString('hex');

  const server = await serverRepo.createServerRepo({
    name,
    icon: icon || "",
    ownerId: userId,
    members: [userId],
    inviteCode: invitecode
  });

  const channel = await Channel.create({
    name: "general",
    type: "text",
    serverId: server._id,
    createdBy: userId
  });

  server.channels.push(channel._id);
  await serverRepo.saveServerRepo(server);

  return {
    message: "Server created successfully",
    server,
    defaultChannel: channel
  };
};

const getServersService = async (userId) => {

  const pipeline = [
    { $match: { members: new mongoose.Types.ObjectId(userId) } },
    {
      $addFields: {
        memberCount: { $size: "$members" },
        channelCount: { $size: "$channels" }
      }
    },
    {
      $project: {
        name: 1,
        icon: 1,
        ownerId: 1,
        invitecode: 1,
        memberCount: 1,
        channelCount: 1,
        createdAt: 1
      }
    },
    { $sort: { createdAt: -1 } }
  ];

  return await serverRepo.aggregateServersRepo(pipeline);
};

const joinServerService = async (userId, serverId) => {

  const server = await serverRepo.findServerByIdRepo(serverId);
  if (!server) throw new Error("Server not found");

  if (server.members.includes(userId)) {
    throw new Error("User already joined this server");
  }

  server.members.push(userId);
  await serverRepo.saveServerRepo(server);

  return server;
};

const leaveServerService = async (userId, serverId) => {

  const server = await serverRepo.findServerByIdRepo(serverId);
  if (!server) throw new Error("Server not found");

  if (!server.members.includes(userId)) {
    throw new Error("You are not a member");
  }

  if (server.ownerId.toString() === userId) {
    throw new Error("Owner cannot leave server");
  }

  server.members = server.members.filter(
    (member) => member.toString() !== userId
  );

  await serverRepo.saveServerRepo(server);

  return { message: "Left server successfully" };
};
const getServerByIdService = async (userId, serverId) => {

  const server = await serverRepo.findServerByIdRepo(serverId);

  if (!server) throw new Error("Server not found");

  if (!server.members.includes(userId)) {
    throw new Error("Access denied");
  }

  return server;
};

module.exports = {
  createServerService,
  getServersService,
  getServerByIdService,
  joinServerService,
  leaveServerService
};
