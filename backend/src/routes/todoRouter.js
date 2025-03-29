const {Router} = require("express")

// const userController = require("../controllers/userController")
const todoRouter = Router()


todoRouter.get("/",(req,res)=>{
    res.send("control your mind")
})

module.exports = todoRouter;