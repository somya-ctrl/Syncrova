const mongoose = require('mongoose');
async function connectmongoDB(user){
    try{
        await mongoose.connect(user);
        console.log("connected to mongodb");

    }catch(error){
        console.error("error connecting to mongodb",error)

    }

}
module.exports = {connectmongoDB};