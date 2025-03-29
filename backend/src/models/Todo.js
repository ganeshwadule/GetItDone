const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    isDone:Boolean,
    userId:mongoose.Types.ObjectId,
    todoType:String,
    dateCreated:Date
})


const Todo = mongoose.model("todos",todoSchema);

module.exports = Todo
