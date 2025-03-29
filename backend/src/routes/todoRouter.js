const { Router } = require("express");

const todoController = require("../controllers/todoController")
// const userController = require("../controllers/userController")
const todoRouter = Router();

// /api/v1/user/todo
todoRouter.get("/:filter/:id?",todoController.getTodo);

todoRouter.post("/",todoController.createTodo);

todoRouter.put("/:id",todoController.updateTodo)

todoRouter.delete("/:id",todoController.deleteTodo)

module.exports = todoRouter;
