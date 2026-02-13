const User = require('../models/auth.model');

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUserById = async (userId, updates) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};

module.exports = {
  findUserById,
  updateUserById
};
