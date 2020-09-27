const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

// gets all users from the database

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
                DatabaseError: "Could not connect to MySQL server."
            });
        }
    });
}

// gets data about one user, search by e-mail

exports.user_getbyusername = (req,res)=>{
    const sql = 'CALL getUser(?)';
    poolDb.getConnection(function (err, connection) {
        var usernameReq = req.params.username;
        if(!err){
            connection.query(sql, [usernameReq],(err, rows)=>{
                if(!err){
                    if(rows[0].length>0){
                        return res.status(200).json({
                            User_Data: rows[0]
                        });
                    }
                    else{
                        return res.status(400).json({
                            ErrorMessage: "User with username `"+usernameReq+"` does not exist."
                        });
                    }
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

// creates a new user

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
                        CreatedUser: 'User with e-mail `'+emailReq+'` created successfully!',
                        DatabaseResponse: rows[0]
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

// edit an existing user e-mail

exports.user_patch = (req, res, next)=>{
    poolDb.getConnection(function(err, connection){
        if(!err){
            var sql = "";
        }
    })
}

// update username via e-mail

exports.user_usernamepatch = (req,res,next)=>{
    poolDb.getConnection(function(err, connection){
        if(!err){
            var sql = 'CALL updateUsername(?,?)';
            var emailReq = req.params.email;
            var usernameReq = req.body.username;
            if(!err){
                connection.query(sql,[emailReq,usernameReq], (err, rows)=>{
                    if(!err){
                        res.status(201).json({
                            UpdatedUser: 'User with e-mail `'+emailReq+'` has changed its username to `'+usernameReq+'` successfully.',
                            DatabaseResponse: rows[0]
                        });
                    }
                    else {
                        print('errooor');
                    }
                });
            }
            else {
                return res.status(404).json({
                    SyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                });
            }
        }
        else {
            return res.status(500).json({
                DatabaseError: "Could not connect to MySQL server."
            });
        }
    });
}

// delete an existing user via e-mail