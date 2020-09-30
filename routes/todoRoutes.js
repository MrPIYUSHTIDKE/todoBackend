const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');

router.get('/', TodoController.todo_getall);

router.get('/:todoid', TodoController.todo_getbyid);

router.get('/peruser/:email', TodoController.todo_getalltodosperuser);

router.get('/favourite/:email', TodoController.todo_getallfavouritesperuser);

router.get('/finished/:email', TodoController.todo_getallfinishedperuser);

router.get('/notfinished/:email', TodoController.todo_getallnotfinishedperuser);

router.post('/',TodoController.todo_create);

router.delete('/:todoid', TodoController.todo_delete);

module.exports = router;