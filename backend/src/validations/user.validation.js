const { z } = require("zod");

const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  avatar: z.string().optional()
});

const updateStatusSchema = z.object({
  status: z.enum(["online", "offline", "busy", "dnd"])
});

module.exports = {
  updateUserSchema,
  updateStatusSchema
};