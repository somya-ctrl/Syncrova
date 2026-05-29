const helmet = require("helmet");
const express = require('express');

const routes = require('./routes'); 

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);  
module.exports = app;
