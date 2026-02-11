const messageRepo = require('../repositories/message.repository');

const sendMessageService = async (userId, channelId, content, io) => {

  if (!content) {
    throw new Error("Message required");
  }

  const message = await messageRepo.createMessage({
    content,
    channelId,
    senderId: userId
  });

  if (io) {
    io.to(channelId).emit("newMsg", message);
  }

  return message;
};

const getMessagesService = async (channelId, page, limit) => {

  const skip = (page - 1) * limit;

  const messages = await messageRepo.getMessagesAggregate(channelId, skip, limit);

  return {
    page,
    limit,
    count: messages.length,
    messages
  };
};

const editMessageService = async (userId, messageId, content) => {

  const message = await messageRepo.findMessageById(messageId);

  if (!message) {
    throw new Error("message not found");
  }

  const channel = await messageRepo.findChannelById(message.channelId);
  const server = await messageRepo.findServerById(channel.serverId);

  if (!channel) throw new Error("channel not found");
  if (!server) throw new Error("server not found");

  if (
    message.senderId.toString() !== userId &&
    server.ownerId.toString() !== userId
  ) {
    throw new Error("Not allowed to edit this message");
  }

  message.content = content;
  await messageRepo.saveMessage(message);

  return {
    message: "Message updated successfully",
    updatedMessage: message
  };
};

module.exports = {
  sendMessageService,
  getMessagesService,
  editMessageService
};
