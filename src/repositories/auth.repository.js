const User = require("../models/auth.model");
const Refreshtoken = require("../models/refreshtoken.model");
const createUser = async(data)  =>{
    return await User.create(data);
}
const saveRefreshToken = async (data) => {
  return await Refreshtoken.create(data);
};

module.exports = {
  createUser,
  saveRefreshToken
};