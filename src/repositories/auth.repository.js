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
const deleteUserRefreshToken = async (userId, token) => {
  return await Refreshtoken.deleteOne({
    user: userId,
    token: token
  });
};


module.exports = {
  createUser,
  saveRefreshToken,
  findUserByEmail,
  findRefreshToken,
  deleteRefreshToken,
  deleteUserRefreshToken
};