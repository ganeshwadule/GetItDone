const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const mongoose  = require("mongoose");
const authMiddleware = require("./auth/auth");
const cors = require("cors")

const dbConnection = async ()=>{
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("connected to database")
}

const app = express();

const port = process.env.PORT || 3001;


// allowing request from cross origins
app.use(cors({
    origin: "http://localhost:5173",  // ✅ Specify frontend URL (no "*")
    credentials: true,  // ✅ Allow cookies to be sent
  }))
// data parsing middlewares
app.use(express.json())
app.use(cookieParser())

// Route middlewares
app.use("/api/v1/user",userRouter)
app.use(authMiddleware) 
app.use("/api/v1/user/todo",todoRouter)


app.get("/",(req,res)=>{
    res.send("Welcome to GetItDone")
})


async function main(){
    await dbConnection();
    app.listen(port,()=>console.log(`Server is running on ${port}`))
}

main()