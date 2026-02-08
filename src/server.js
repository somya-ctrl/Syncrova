require('dotenv').config();

const http = require('http');
const app = require('./app');
const { connectmongoDB } = require('./config/db');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
connectmongoDB(process.env.MONGO_URI);
const io = initSocket(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
