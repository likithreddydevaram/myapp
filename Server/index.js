const express=require('express')
const app=express();

const userRoutes=require('./routes/user')
const profileRoutes=require('./routes/profile')
const paymentRoutes=require('./routes/Payments')
const courseRoutes=require('./routes/Course')
const contactRoutes=require('./routes/Contact')
const database=require("./config/database")
const cookieParser=require('cookie-parser');
const cors=require('cors'); 
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload")
const dotenv=require('dotenv')

const PORT=process.env.PORT||4000

//database connect
database.connect();

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:`${process.env.HOST}`  ///koi frontend comming from 3000 port should be entertained
    , credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })
)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//cloudinaryconnect
cloudinaryConnect();
//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/course",courseRoutes)
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/reach', contactRoutes);
//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running....."
    })
})


app.listen(PORT,()=>{

    console.log(`Server is listening at ${PORT}`)
})