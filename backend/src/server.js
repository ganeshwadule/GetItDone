const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");


const app = express();

const port = process.env.PORT || 3001;

// data parsing middlewares
app.use(express.json())
app.use(cookieParser())

// Route middlewares
app.use("/api/v1/user",userRouter)


app.get("/",(req,res)=>{
    res.send("Welcome to GetItDone")
})


app.listen(port,()=>console.log(`Server is running on ${port}`))