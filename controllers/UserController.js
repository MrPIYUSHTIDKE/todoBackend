const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

exports.user_getAll = (req,res)=>{
    const sql = 'CALL getAllUsers();';
    poolDb.getConnection(function (err, connection) {
        if(!err){
            connection.query(sql, (err, rows)=>{
                if(!err && rows[0].length>0){
                    return res.status(200).json({
                        Result: rows[0]
                    });
                }
                else {
                    return res.status(404).json({
                        Errooor: "doesnt work booi"
                    });
                }
            })
        }
        else{
            return res.status(500).json({
                bigError: 'boooi u fked up'
            });
        }
    });
}

exports.user_post = (req,res)=>{
    poolDb.getConnection(function (err, connection){
        const emailReq = req.body.email;
        const nameReq = req.body.name;
        const surnameReq = req.body.surname;
        const passwordReq = req.body.password;
        if(!err){
            const sql = 'INSERT INTO `user` VALUES(?,?,?,?)'; 
            connection.query(sql,[emailReq,nameReq,surnameReq,passwordReq], (err,rows)=>{
                if(!err){
                    return res.status(201).json({
                        Message: 'User with e-mail '+emailReq+' created successfully!',
                        DbResponse: rows[0]
                    });
                }
                else{
                    return res.status(404).json({
                        postError: 'cannot post, sry'
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                serverError:"could not connect to mysql db"
            });
        }
    });
}