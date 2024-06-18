const express = require('express')
const { getTodoItems, postTodoItems, deleteTodoItem } = require('../controllers/todoController')
const router = express.Router()

router.route('/todo-items').get(getTodoItems).post(postTodoItems)
router.route('/todo-items/:id').delete(deleteTodoItem)

module.exports = router