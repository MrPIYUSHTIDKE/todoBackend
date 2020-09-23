const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('this is the todolists route and it works');
    return res.status(200).json('todo base route works');
});

router.get('/:todoid', (req,res)=>{
    console.log('testing the todo identifier get method');
    return res.status(200).json('todo get request with identification works');
})

module.exports = router;