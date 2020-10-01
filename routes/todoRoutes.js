const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');

// Create method

router.post('/',TodoController.create);

// Read methods

router.get('/', TodoController.getall);

router.get('/:todoid', TodoController.getbyid);

router.get('/peruser/:email', TodoController.getalltodosperuser);

router.get('/favourite/:email', TodoController.getallfavouritesperuser);

router.get('/finished/:email', TodoController.getallfinishedperuser);

router.get('/notfinished/:email', TodoController.getallunfinishedperuser);

// Update methods

router.patch('/:todoid', TodoController.update);

// Delete methods

router.delete('/:todoid', TodoController.delete);

module.exports = router;