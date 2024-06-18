const asyncHandler = require('express-async-handler')
const TodoItems = require('../models/todoModel')

// GET -> /api/todo-items
const getTodoItems = asyncHandler(async (req,res) => {
    const items = await TodoItems.find()
    if (!items) {
        res.json({error:"Error fetching items"})
    }
    res.status(200).json({items:items})
})

// POST -> /api/todo-items
const postTodoItems = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { todoName, todoDue } = req.body
    const createItem = await TodoItems.create({
        title: todoName,
        date: todoDue
    })
    if (!createItem) {
        throw new Error("Error adding new todo-item")
    }
    res.status(200).json({success: "New Item Added", createItem})
})

// DELETE -> /api/todo-items/:id
const deleteTodoItem = asyncHandler(async(req, res) => {
    const item = await  TodoItems.findByIdAndDelete({ _id: req.params.id })
    if (!item) {
        res.status(201)
        throw new Error("Given items id doest not exist")
    }
    res.status(200).json({succes:"Item deleted ", item})
})

module.exports = {getTodoItems,postTodoItems, deleteTodoItem}