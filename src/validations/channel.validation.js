const { z } = require("zod");

const createChannelSchema = z.object({
  name: z.string().min(2, "Channel name must be at least 2 characters"),
   serverId: z.string().min(1, "Server ID required"),
  type: z.enum(["text", "voice"]).optional()
});

module.exports = {
  createChannelSchema
};