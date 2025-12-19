require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user')
const userRoutes = require('./routes/user')
const {connectmongoDB} = require('./connection/user');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoutes);
app.use('/users',userRoutes);
const PORT = process.env.PORT || 3000;
connectmongoDB(process.env.MONGO_URI);
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));