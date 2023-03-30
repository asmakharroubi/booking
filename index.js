
//Initializing dependencies
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const connectDB = require("./config/connectDB")
require("dotenv").config()
const tourRoute = require("./routes/tours.js")
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js");
const reviewRoute = require("./routes/reviews.js");
const bookingRoute = require("./routes/booking.js");

const PORT = process.env.PoRT || 5000

const corsOptions ={
    origin:true,
    credentials:true
}
// db connection
mongoose.set('strictQuery',false)
const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MONGO database connected')
    }catch(err){
        console.log('mongoDB  database connection failed')
    }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);




app.listen(PORT, ()=>{
    connect()
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})

// app.listen(PORT, (err)=>{
//     if(err) throw err
//     console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
// })

// Connect to DB 
// connectDB()
// connecting routes
// app.use("/api/users", require("./routes/authRoutes"))