const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('this is the user route and it works');
    return res.status(200).json('user base route works');
});

router.get('/:email', (req,res)=>{
    console.log('testing the user identifier get method');
    return res.status(200).json('user get request with identification works')
})

module.exports = router;