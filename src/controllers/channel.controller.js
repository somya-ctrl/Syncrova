const channelService = require('../services/channels.service');

async function createChannel(req, res) {
  try {
    const { name, serverId, type } = req.body;
    const userId = req.user.id;

    const result = await channelService.createChannelService(
      userId,
      name,
      serverId,
      type
    );
   res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function createchannelinserver(req, res) {
  try {
    const serverId = req.params.id;
    const userId = req.user.id;
    const { name, type } = req.body;

    const result = await channelService.createChannelInServerService(
      userId,
      serverId,
      name,
      type
    );
   res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getchannelinserver(req, res) {
  try {
    const serverId = req.params.id;
    const channels = await channelService.getChannelsInServerService(serverId);
   res.status(200).json(channels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteChannel(req, res) {
  try {
    const channelId = req.params.id;
    const userId = req.user.id;

    const result = await channelService.deleteChannelService(userId, channelId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createChannel,
  deleteChannel,
  createchannelinserver,
  getchannelinserver
};
