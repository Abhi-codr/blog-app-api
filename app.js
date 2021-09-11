require("dotenv").config()
const express = require("express");
const colors = require("colors")
const cors = require("cors");
const CustomError = require("./utils/CustomError")
const handleError = require( "./utils/handleError" );
const connectDB = require( "./config/db" );
const postRouter = require("./routers/postRouter")
const userRouter = require("./routers/userRouter")
const {PORT} = process.env
connectDB();

const app = express()

app.use(cors())
app.use(express.json())

app.use("/posts",postRouter)
app.use("/users",userRouter)

app.get("/",(req,res,next)=>{
    res.status(200).json({status:"success",message:"Blog api running"})
})

app.all("*",(req,res,next)=>{
    next(new CustomError(404,"Page not found"))
})

app.use(handleError);

app.listen(PORT,()=>{
    console.log(`SERVER STARTED IN PORT ${PORT}`.cyan.inverse)
})