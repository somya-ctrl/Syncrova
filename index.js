require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectmongoDB = require('./connection/user');

const app = express();


const PORT = process.env.PORT || 3000;