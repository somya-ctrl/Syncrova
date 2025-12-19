const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{type:String,
        required:true,
        minlength:4,
        maxlength:30

    },
    email:{
        type:String,
        required:true,
        unique :true},
    password:{
        type:String,
        required:true
    }

    
},{
    timestamps:true
})
const User = mongoose.model('User', UserSchema);
module.exports = User;
