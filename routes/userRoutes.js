const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const UserController = require('../controllers/UserController');

// router.get('/', (req,res)=>{
//     console.log('this is the user route and it works');
//     return res.status(200).json('user base route works');
// });

router.get('/', UserController.user_getAll);

router.get('/:email', (req,res)=>{
    console.log('testing the user identifier get method');
    return res.status(200).json('user get request with identification works')
});

router.post('/', UserController.user_post);

module.exports = router;