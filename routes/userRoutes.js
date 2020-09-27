const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.user_getAll);

withrouter.get('/:username', UserController.user_getbyusername);

router.patch('/changeusername/:email', UserController.user_usernamepatch);

router.post('/', UserController.user_post);

module.exports = router;