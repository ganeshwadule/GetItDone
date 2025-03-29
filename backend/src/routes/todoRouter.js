const { Router } = require("express");
const User = require("../models/User");
const Todo = require("../models/Todo");

// const userController = require("../controllers/userController")
const todoRouter = Router();

// /api/v1/user/todo
todoRouter.get("/:filter", async(req, res) => {
    try {
        const {userId} = req;

        const todos = await Todo.find({userId,todoType:req.params.filter});

        res.json(todos)
    } catch (error) {
        res.json({
            message: "Invalid Data format",
            error: parsedData.error.issues[0].message,
          });
    }
});

todoRouter.post("/", async (req, res) => {
  const { userId } = req;
  const { title, description, isDone, todoType } = req.body;

  try {
    const todo = {
      title,
      description,
      isDone: false,
      todoType:todoType.toLowerCase(),
      userId,
      dateCreated: new Date(),
    };

    await Todo.create(todo);
     res.json({
      message: "todo created successfully",
    });
  } catch (error) {
    res.json({
      message: "Some error occurred",
      error: error,
    });
  }
});
module.exports = todoRouter;
