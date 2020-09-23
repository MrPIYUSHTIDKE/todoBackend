const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.user_getAll);

router.get('/:email', UserController.user_getbyemail);

router.post('/', UserController.user_post);

module.exports = router;