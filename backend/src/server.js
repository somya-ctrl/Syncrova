require('dotenv').config();

const http = require('http');
const app = require('./app');
const { connectmongoDB } = require('./config/db');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
connectmongoDB(process.env.MONGO_URI);
const io = initSocket(server);

// Insert io middleware at the very beginning of the stack
// so it runs before any route handler
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Re-mount routes AFTER the io middleware so req.io is available
const routes = require('./routes');
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
