import Todo from "../models/todos.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

//Create a new todo
const createTodo = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title && !body) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const existingUser = await User.findOne({ _id: req.user._id });
  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const todo = await Todo.create({
    title,
    body,
    userId: req.user._id,
  });
  if (!todo) {
    return res.status(400).json({ message: "Todo creation failed" });
  }

  return res.status(200).json({
    message: "Todo created successfully",
    data: todo,
  });
});

//Get all todos
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  if (!todos) {
    return res.status(400).json({ message: "Todos not found" });
  }
  return res.status(200).json({
    message: "Todos retrieved successfully",
    data: todos,
  });
});

//Get a single Todo
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }
  return res.status(200).json({
    message: "Todo retrieved successfully",
    data: todo,
  });
});

//Update a todo
const updateTodo = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const todo = await Todo.findOne({ _id: req.params.id });
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }
  todo.title = title;
  todo.body = body;
  await todo.save();
  return res.status(200).json({
    message: "Todo updated successfully",
    data: todo,
  });
});

//Delete a todo
const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.deleteOne();
    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});


//Export the functions
export { createTodo, getTodos, updateTodo, deleteTodo };
