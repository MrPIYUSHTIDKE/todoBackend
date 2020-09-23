const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');

router.get('/', TodoController.todo_getall);

router.get('/:todoid', TodoController.todo_getbyid);

module.exports = router;