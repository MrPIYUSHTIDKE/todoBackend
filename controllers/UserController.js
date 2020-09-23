const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

exports.user_getAll = (req,res)=>{
    const sql = 'CALL getAllUsers();';
    poolDb.getConnection(function (err, connection) {
        if(!err){
            connection.query(sql, (err, rows)=>{
                if(!err && rows[0].length>0){
                    return res.status(200).json({
                        Users: rows[0]
                    });
                }
                else {
                    return res.status(404).json({
                        SyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            })
        }
        else{
            return res.status(500).json({
                DatabaseError: 'my nig u fked up big time'
            });
        }
    });
}

exports.user_getbyemail = (req,res)=>{
    const sql = 'CALL getUser(?)';
    poolDb.getConnection(function (err, connection) {
        var emailReq = req.params.email;
        if(!err){
            connection.query(sql, [emailReq],(err, rows)=>{
                if(!err){
                    return res.status(200).json({
                        User: rows[0]
                    });
                }
                else{
                    return res.status(404).json({
                        SyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseError: "Could not connect to MySQL server."
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
                        CreatedUser: 'User with e-mail '+emailReq+' created successfully!',
                        DbResponse: rows[0]
                    });
                }
                else{
                    return res.status(404).json({
                        SyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseError: "Could not connect to MySQL server."
            });
        }
    });
}