const mongoose = require("mongoose")

require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

// Connecting to db
const connectDB = ()=>{
    mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(console.log("DB CONNECTED")).catch((err)=>console.log(err))
}

module.exports = connectDB ;