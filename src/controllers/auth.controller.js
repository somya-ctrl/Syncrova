const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/auth');
const Refreshtoken = require('../models/refreshtoken');
async function signup(req,res){
   try{
         const user = new User(req.body);
         const saltrounds = 10;
         const hashedpassword = await bcrypt.hash(user.password,saltrounds);
         user.password = hashedpassword;
         const accesstoken = jwt.sign(
            {id:user._id,
            email:user.email
            },process.env.JWT_SECRET,
            {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
            }
         );
         const refreshtoken = crypto.randomBytes(54).toString("hex");
         await Refreshtoken.create({
            user:user._id,
            token:refreshtoken,
            expiresAt: new Date(Date.now() + 7*24*60*60*1000),

         });
         await user.save();
         res.status(201).json({
            message:"signup successfull",
            accesstoken,
            refreshtoken,
            user
         });
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}  
    async function login(req,res){
        try{
            const{email,password } = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({error:"user not found"});
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(401).json({error:"Invalid Credentials"});        
              }
           const accesstoken = jwt.sign(
            {id :user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN||"15m"}
           );
           const refreshtoken = crypto.randomBytes(54).toString("hex");
           await Refreshtoken.create({
            user:user._id,
        token:refreshtoken,
    expiresAt: new Date(Date.now()+ 7*24*60*60*1000),
           });
           res.status(200).json({
            message:"login successfull",
            accesstoken,
            refreshtoken,
            user:{id :user._id,name:user.username,email:user.email},
           });
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
async function refresh(req,res){
    try{
        const {refreshtoken} = req.body;
        if(!refreshtoken)
            return res.status(400).json({error:"refreshtoken is required"});
        const tokenDoc = await Refreshtoken.findOne({token:refreshtoken});
        if(!tokenDoc)
            return res.status(403).json({error:"invalid refreshtoken"});
        
        if (tokenDoc.expiresAt < new Date()) {
        await tokenDoc.deleteOne();
        return res.status(403).json({ error: "Refresh token expired" });
        }

        const accesstoken = jwt.sign(
            {id:tokenDoc.user},
            process.env.JWT_SECRET,
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN || "15m"}
        );
        res.status(200).json({accesstoken});
    }catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    await Refreshtoken.deleteOne({ token: refreshToken });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { signup, login, refresh, logout };
