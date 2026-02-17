
const messageService = require('../services/message.service');

async function sendMessage(req, res) {
  try {

    const { content } = req.body;
    const channelId = req.params.id;
    const userId = req.user.id;

    const message = await messageService.sendMessageService(
      userId,
      channelId,
      content,
      req.io
    );

    res.status(201).json(message);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getmessage(req, res) {
  try {

    const channelId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await messageService.getMessagesService(
      channelId,
      page,
      limit
    );

    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function editmessage(req, res) {
  try {

    const messageId = req.params.id;
    const { content } = req.body;
    const userId = req.user.id;

    const result = await messageService.editMessageService(
      userId,
      messageId,
      content
    );

    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
const deleteMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const messageId = req.params.id;

    const result = await messageService.deleteMessageService(
      userId,
      messageId,
      req.io
    );

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, getmessage, editmessage ,deleteMessage};
