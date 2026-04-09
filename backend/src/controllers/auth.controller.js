const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/auth.model');
const Refreshtoken = require('../models/refreshtoken.model');
const authService = require('../services/auth.service');

async function signup(req, res) {
  try {

    const result = await authService.signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {

    const { email, password } = req.body;
    const result = await authService.loginService(email, password);
    res.status(200).json(result);

  } catch (error) {

    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }

    if (error.message === "Invalid Credentials") {
      return res.status(401).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
}
async function refresh(req, res) {
  try {

    const { refreshtoken } = req.body;

    const result = await authService.refreshService(refreshtoken);

    res.status(200).json(result);

  } catch (error) {
    if (error.message === "refreshtoken is required") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "invalid refreshtoken") {
      return res.status(403).json({ error: error.message });
    }
    if (error.message === "Refresh token expired") {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {

    const { refreshToken } = req.body;
    const userId = req.user.id; 
    const result = await authService.logoutService(userId, refreshToken);
    res.status(200).json(result);

  } catch (error) {

    if (error.message === "refreshToken is required") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login, refresh, logout };
