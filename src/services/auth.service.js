const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const authRepo = require('../repositories/auth.repository');

const signupService = async (userData) => {

  const saltrounds = 10;
  const hashedpassword = await bcrypt.hash(userData.password, saltrounds);
  userData.password = hashedpassword;
  const user = await authRepo.createUser(userData);
  const accesstoken = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
    }
  );
  const refreshtoken = crypto.randomBytes(54).toString("hex");
  await authRepo.saveRefreshToken({
    user: user._id,
    token: refreshtoken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return {
    message: "signup successfull",
    accesstoken,
    refreshtoken,
    user
  };
};

module.exports = { signupService };
