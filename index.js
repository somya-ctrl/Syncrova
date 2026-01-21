require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require("socket.io");
const authRoutes = require('./routes/user')
const userRoutes = require('./routes/user')
const {connectmongoDB} = require('./connection/user');



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoutes);
app.use('/users',userRoutes);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
connectmongoDB(process.env.MONGO_URI);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
