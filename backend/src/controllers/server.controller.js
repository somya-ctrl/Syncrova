const serverService = require('../services/server.service');

const createServer = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const userId = req.user.id;

    const result = await serverService.createServerService(userId, name, icon);
    res.status(201).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getserver = async (req, res) => {
  try {
    const userId = req.user.id;
    const servers = await serverService.getServersService(userId);
    res.status(200).json(servers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinServer = async (req, res) => {
  try {
    const userId = req.user.id;
    const serverId = req.params.id;

    const result = await serverService.joinServerService(userId, serverId);
    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const leaveServer = async (req, res) => {
  try {
    const userId = req.user.id;
    const serverId = req.params.id;

    const result = await serverService.leaveServerService(userId, serverId);
    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getserverbyid = async (req, res) => {
  try {
    const serverId = req.params.id;
    const userId = req.user.id;

    const result = await serverService.getServerByIdService(userId, serverId);

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteServer = async (req, res) => {
  try {
    const userId = req.user.id;
    const serverId = req.params.id;

    const result = await serverService.deleteServerService(userId, serverId);

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createServer,
  getserver,
  getserverbyid,
  joinServer,
  leaveServer,
  deleteServer
};
