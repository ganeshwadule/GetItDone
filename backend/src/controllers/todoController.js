const User = require("../models/User");
const Todo = require("../models/Todo");

async function getTodo(req, res) {
  try {
    if (req.params.id) {
      const todo = await Todo.findById(req.params.id);
      return res.json(todo);
    }
    const { userId } = req;

    const todos = await Todo.find({ userId, todoType: req.params.filter });

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
      error: error,
    });
  }
}

async function createTodo(req, res) {
  const { userId } = req;
  const { title, description,todoType } = req.body;

  try {
    const todo = {
      title,
      description,
      isDone: false,
      todoType: todoType.toLowerCase(),
      userId,
      dateCreated: new Date(),
    };

    await Todo.create(todo);
    res.json({
      message: "todo created successfully",
      todo
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
      error: error,
    });
  }
}

async function updateTodo(req, res) {
  try {
    const {userId} = req;
    const updatedTodo = await Todo.findOneAndUpdate({ _id: req.params.id, userId: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) return res.status(404).json("todo doesn't exist");

    res.status(200).json({message:"updated todo successfully",todo:updatedTodo});

  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
      error: error,
    });
  }
}

async function deleteTodo(req,res){
    try {
      const {userId} = req;
      const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: userId });

        if(!deletedTodo)return res.status(404).json("todo with given id doesn't exists")

        res.status(200).json({message:"deleted todo",todo:deletedTodo})

    } catch (error) {
        res.status(500).json({
            message:"Some error occurred",
            error:error
        })
    }
}

module.exports = { getTodo, createTodo, updateTodo,deleteTodo };
