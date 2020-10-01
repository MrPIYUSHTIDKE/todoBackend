const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Create methods

router.post('/register/', UserController.register);

router.post('/login/', UserController.login);

// Read methods

router.get('/', UserController.getall);

router.get('/:username', UserController.getbyusername);

// Update methods

router.patch('/changeusername/', UserController.changeusername);

router.patch('/changepassword/:username', UserController.changepassword)

// Delete method

router.delete('/:username',UserController.delete);

module.exports = router;