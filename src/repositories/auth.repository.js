const User = require("../models/auth.model");
const Refreshtoken = require("../models/refreshtoken.model");
const createUser = async(data)  =>{
    return await User.create(data);
}
const saveRefreshToken = async (data) => {
  return await Refreshtoken.create(data);
};
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
const findRefreshToken = async (token) => {
  return await Refreshtoken.findOne({ token });
};

const deleteRefreshToken = async (tokenDoc) => {
  return await tokenDoc.deleteOne();
};

module.exports = {
  createUser,
  saveRefreshToken,
  findUserByEmail,
  findRefreshToken,
  deleteRefreshToken
};