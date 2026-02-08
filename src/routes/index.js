const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const serverRoutes = require('./server.routes');
const channelRoutes = require('./channel.routes');
const messageRoutes = require('./message.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/servers', serverRoutes);
router.use('/channels', channelRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
