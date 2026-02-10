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

const loginService = async (email, password) => {

  const user = await authRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const accesstoken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );

  const refreshtoken = crypto.randomBytes(54).toString("hex");

  await authRepo.saveRefreshToken({
    user: user._id,
    token: refreshtoken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return {
    message: "login successful",
    accesstoken,
    refreshtoken,
    user: {
      id: user._id,
      name: user.username,
      email: user.email
    }
  };
};

const refreshService = async (refreshtoken) => {

  if (!refreshtoken) {
    throw new Error("refreshtoken is required");
  }

  const tokenDoc = await authRepo.findRefreshToken(refreshtoken);

  if (!tokenDoc) {
    throw new Error("invalid refreshtoken");
  }

  if (tokenDoc.expiresAt < new Date()) {
    await authRepo.deleteRefreshToken(tokenDoc);
    throw new Error("Refresh token expired");
  }

  const accesstoken = jwt.sign(
    { id: tokenDoc.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );

  return { accesstoken };
};

module.exports = { signupService, loginService, refreshService };

