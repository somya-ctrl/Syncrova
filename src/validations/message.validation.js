const { z } = require("zod");

const sendMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty")
});

const editMessageSchema = z.object({
  content: z.string().min(1, "Updated message cannot be empty")
});
module.exports = {
  sendMessageSchema,
  editMessageSchema
};