const userService = require('../services/user.service');

const getuser = async (req, res) => {
  try {
    const user = await userService.getUserService(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateuser = async (req, res) => {
  try {
    const { username, avatar } = req.body;

    const user = await userService.updateUserService(
      req.user.id,
      username,
      avatar
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatestatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await userService.updateStatusService(
      req.user.id,
      status
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getuser,
  updateuser,
  updatestatus
};
