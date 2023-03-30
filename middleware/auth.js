const jwt = require("jsonwebtoken")
require("dotenv").config()



const auth=(req,res,next)=>{
    // extract token
    const token = req.header("authorization")
    if(!token){
        res.status(400).json({msg:"You are not authorized"})
    }
    try{

        // verify token 
        const decode = jwt.verify(token,process.env.SECRET)
        res.user = decode
        next()

    }
    catch(error){
        res.status(500).json({msg:"Invalid token"})
    }
}

module.exports = auth