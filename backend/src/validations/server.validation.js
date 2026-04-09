const { z } = require("zod");

const createServerSchema = z.object({
  name: z.string().min(3, "Server name must be at least 3 characters"),
  icon: z.string().optional()
});

module.exports = {
  createServerSchema
};