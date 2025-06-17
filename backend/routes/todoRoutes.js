const express = require('express');

const router = express.Router();

const todoController = require('../controller/todoController'); 

router.route('/').post(todoController.addTodo).get(todoController.getTodo);
router.route('/:id').get(todoController.getTodoByID).put(todoController.updateTodo).delete( todoController.deleteTodo);


module.exports = router;