const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post("/register", async (req,res)=>{
    try{
        const {firstName,lastName,address,phoneNumber,email,password} = req.body

        // verifying the existence of all fields
        if(!firstName || !lastName || !address || !phoneNumber || !email || !password){
            res.status(400).json({msg:"All fields are required"})
        }
        
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            res.status(400).json({msg:"User Already Exist"})
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPwd = await bcrypt.hash(password,salt)
        const user = await User.create({firstName,lastName,address,phoneNumber,email,password:hashedPwd})
        res.status(200).json({status:true,msg:"User has been created",data:user})
    }
    catch(err){
        res.status(500).json({status:false,msg:err})

    }
})

router.post("/login", async (req,res)=>{
    try{ 
        const {email,password}= req.body
         // verifying the existence of all fields
        if(!email || !password){
            res.status(400).json({msg:"All fields are required"})
        }

        const user = await User.findOne({email:email})
        
        if (user) {
          const verify_password = await bcrypt.compare(password, user.password);

          if (verify_password) {
            const token = await jwt.sign(
              { id: user._id },
              process.env.SECRET
            );
            res.status(200).json({
              status: true,
              msg: "Logged in successfully",
              data: user,
              token: token,
            });
          } else {
            res.status(400).json({ msg: "Wrong Credentials" });
          }
        } else {
          res.status(400).json({ msg: "User Does not Exist" });
        }

    }
    catch(err){
        res.status(500).json({status:false,msg:err})
        
    }
    
})







module.exports=router