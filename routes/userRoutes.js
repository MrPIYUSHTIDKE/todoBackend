const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.user_getAll);

router.get('/:username', UserController.user_getbyusername);

router.patch('/changeusername/:oldUsername', UserController.user_usernamepatch);

router.post('/', UserController.user_post);

router.delete('/:username',UserController.user_delete);

router.post('/login/:username', UserController.user_login);

module.exports = router;