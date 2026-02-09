const User = require('../models/auth.model');

async  function getuser (req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
async function updateuser(req,res){
    try{
      const updates = {};
       if (req.body.username) updates.username = req.body.username;
       if (req.body.avatar) updates.avatar = req.body.avatar;
        const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
    }
 async function updatestatus(req, res) {
  try {
    const { status } = req.body;

    const allowed = ["online", "offline", "busy", "dnd"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { status },
      { new: true }
    ).select("username status");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



module.exports = { getuser, updateuser, updatestatus };