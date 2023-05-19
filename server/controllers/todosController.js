const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
};

const createTodo = async (req, res) => {
  const { text, isDone } = req.body;

  const todo = await Todo.create({
    text,
    isDone,
  });

  if (todo) {
    return res.status(201).json({ message: "New todo created" });
  } else {
    return res.status(400).json({ message: "Invalid todo data received" });
  }
};

const updateTodo = async (req, res) => {
  const { id, isDone } = req.body;

  console.log(isDone);

  const todo = await Todo.findById(id).exec();

  todo.isDone = isDone;

  const updatedTodo = await todo.save();

  res.json(` Todo with ID '${todo._id}' updated`);
};

module.exports = { createTodo, updateTodo, getTodos };
