const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router
  .route("/")
  .get(todosController.getTodos)
  .post(todosController.createTodo)
  .patch(todosController.updateTodo)

  module.exports = router;