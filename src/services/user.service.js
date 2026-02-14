const userRepo = require('../repositories/user.repository');

const getUserService = async (userId) => {

  const user = await userRepo.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateUserService = async (userId, username, avatar) => {

  const updates = {};
  if (username) updates.username = username;
  if (avatar) updates.avatar = avatar;

  const user = await userRepo.updateUserById(userId, updates);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateStatusService = async (userId, status) => {

  const allowed = ["online", "offline", "busy", "dnd"];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status");
  }

  const user = await userRepo.updateUserById(userId, { status });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  getUserService,
  updateUserService,
  updateStatusService
};
