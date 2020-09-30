const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.user_getAll);

router.get('/:username', UserController.user_getbyusername);

router.patch('/changeusername/', UserController.user_changeusername);

router.patch('/changepassword/:username', UserController.user_changepassword)

router.post('/register/', UserController.user_register);

router.delete('/:username',UserController.user_delete);

router.post('/login/', UserController.user_login);

module.exports = router;