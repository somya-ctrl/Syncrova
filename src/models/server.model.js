const mongoose = require('mongoose');
const serverSchema = new mongoose.Schema(
    {
      name :{
        type:String,
        required:true,
        trim:true
      },
      icon: {
      type: String,
      default: ""
      },

      ownerId :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        required:true
      },
      members: [
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }
    ],
    channels: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Channel"
     }
    ],

   inviteCode: {
     type: String,
     unique: true,
     sparse: true
    }


    },{timestamps:true}
);
module.exports = mongoose.model("Server", serverSchema);
