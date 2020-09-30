const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');

router.get('/', TodoController.todo_getall);

router.get('/:todoid', TodoController.todo_getbyid);

router.post('/',TodoController.todo_create);

router.delete('/:todoid', TodoController.todo_delete);

module.exports = router;