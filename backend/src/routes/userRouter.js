const {Router} = require("express")
const userController = require("../controllers/userController")
const userRouter = Router()


// sign in 
// sign up
userRouter.post("/signup",userController.singUpUser)
userRouter.post("/signin",userController.signInUser)

module.exports = userRouter;