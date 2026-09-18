const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Track users inside voice channels
  const voiceChannels = new Map();

  // =========================
  // Socket Authentication
  // =========================

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.userId = decoded.id;

      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  // =========================
  // Connection
  // =========================

  io.on("connection", (socket) => {
    console.log(
      "User connected:",
      socket.id,
      "User:",
      socket.userId
    );

    // Personal room
    socket.join(`user:${socket.userId}`);

    // ==================================
    // Existing Text Channel
    // ==================================

    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);

      console.log(
        `${socket.userId} joined channel ${channelId}`
      );
    });

    // ==================================
    // Join Voice Channel
    // ==================================

    socket.on("joinVoiceChannel", (channelId) => {

      // If user is already in another voice channel,
      // remove them from that channel first
      if (socket.voiceChannelId) {
        const oldChannel = voiceChannels.get(
          socket.voiceChannelId
        );

        if (oldChannel) {
          oldChannel.delete(socket.userId);

          socket.to(
            `voice:${socket.voiceChannelId}`
          ).emit("userLeftVoice", {
            userId: socket.userId,
          });

          if (oldChannel.size === 0) {
            voiceChannels.delete(socket.voiceChannelId);
          }
        }

        socket.leave(
          `voice:${socket.voiceChannelId}`
        );
      }

      // Create channel if it doesn't exist
      if (!voiceChannels.has(channelId)) {
        voiceChannels.set(channelId, new Set());
      }

      const participants = voiceChannels.get(channelId);

      // Add user
      participants.add(socket.userId);

      // Store current voice channel on socket
      socket.voiceChannelId = channelId;

      // Join Socket.IO voice room
      socket.join(`voice:${channelId}`);

      console.log(
        `${socket.userId} joined voice channel ${channelId}`
      );

      // Tell existing participants that a new user joined
      socket.to(`voice:${channelId}`).emit(
        "userJoinedVoice",
        {
          userId: socket.userId,
        }
      );

      // Send existing participants to the new user
      socket.emit("voiceParticipants", {
        participants: [...participants].filter(
          (id) => id !== socket.userId
        ),
      });
    });

    // ==================================
    // Leave Voice Channel
    // ==================================

    socket.on("leaveVoiceChannel", () => {

      if (!socket.voiceChannelId) {
        return;
      }

      const channelId = socket.voiceChannelId;

      const participants = voiceChannels.get(channelId);

      if (participants) {
        participants.delete(socket.userId);

        if (participants.size === 0) {
          voiceChannels.delete(channelId);
        }
      }

      socket.leave(`voice:${channelId}`);

      socket.to(`voice:${channelId}`).emit(
        "userLeftVoice",
        {
          userId: socket.userId,
        }
      );

      console.log(
        `${socket.userId} left voice channel ${channelId}`
      );

      socket.voiceChannelId = null;
    });

    // ==================================
    // WebRTC Offer
    // ==================================

    socket.on(
      "webrtc:offer",
      ({ targetUserId, offer }) => {

        io.to(`user:${targetUserId}`).emit(
          "webrtc:offer",
          {
            senderUserId: socket.userId,
            offer,
          }
        );
      }
    );

    // ==================================
    // WebRTC Answer
    // ==================================

    socket.on(
      "webrtc:answer",
      ({ targetUserId, answer }) => {

        io.to(`user:${targetUserId}`).emit(
          "webrtc:answer",
          {
            senderUserId: socket.userId,
            answer,
          }
        );
      }
    );

    // ==================================
    // ICE Candidate
    // ==================================

    socket.on(
      "webrtc:ice-candidate",
      ({ targetUserId, candidate }) => {

        io.to(`user:${targetUserId}`).emit(
          "webrtc:ice-candidate",
          {
            senderUserId: socket.userId,
            candidate,
          }
        );
      }
    );

    // ==================================
    // Disconnect
    // ==================================

    socket.on("disconnect", () => {

      if (socket.voiceChannelId) {

        const channelId = socket.voiceChannelId;

        const participants =
          voiceChannels.get(channelId);

        if (participants) {
          participants.delete(socket.userId);

          if (participants.size === 0) {
            voiceChannels.delete(channelId);
          }
        }

        socket.to(`voice:${channelId}`).emit(
          "userLeftVoice",
          {
            userId: socket.userId,
          }
        );
      }

      console.log(
        "User disconnected:",
        socket.userId
      );
    });
  });

  return io;
};

module.exports = { initSocket };