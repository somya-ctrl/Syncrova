const Server = require('../models/server.model');

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

module.exports = {
  createServerRepo,
  findServerByIdRepo,
  saveServerRepo,
  aggregateServersRepo
};
