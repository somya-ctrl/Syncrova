const express = require('express');

const authRoutes = require('./routes/routes');
const userRoutes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
