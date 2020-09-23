const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');

router.get('/', TodoController.todo_getall);

router.get('/:todoid', (req,res)=>{
    console.log('testing the todo identifier get method');
    return res.status(200).json('todo get request with identification works');
})

module.exports = router;