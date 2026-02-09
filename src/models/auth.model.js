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
    },
      status: {
      type: String,
      enum: ["online", "offline", "busy", "dnd"],
      default: "offline"
    }
    
},{
    timestamps:true
})
const User = mongoose.model('User', UserSchema);
module.exports = User;
