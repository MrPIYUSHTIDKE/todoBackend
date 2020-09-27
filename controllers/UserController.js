const db = require('../db/dbSingleton.js');
const bcrypt = require('bcrypt');
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
        const usernameReq = req.body.username;
        const nameReq = req.body.name;
        const surnameReq = req.body.surname;
        const passwordReq = req.body.password;
        const salt = 15;
        const hashedPassword = bcrypt.hashSync(passwordReq, salt);
        if(!err){
            const sql = 'CALL createUser(?,?,?,?,?)'; 
            connection.query(sql,[emailReq,usernameReq,surnameReq,nameReq,hashedPassword], (err,rows)=>{
                if(!err){
                    return res.status(201).json({
                        CreatedUser: 'User with e-mail `'+emailReq+'` created successfully! Welcome onboard, '+nameReq+".",
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

// update username via username. Use current (old) username and add a `username` paramater in the body, storing the value of the new username

exports.user_usernamepatch = (req,res)=>{
    poolDb.getConnection(function(err, connection){
        if(!err){
            var sql = 'CALL updateUsername(?,?)';
            var oldUsername = req.params.oldUsername;
            var usernameReq = req.body.username;
            connection.query(sql,[oldUsername,usernameReq], (err, rows)=>{
                if(!err){
                    if(rows[0].length>0){
                        res.status(201).json({
                            UpdatedUser: 'Successfully changed username to `'+usernameReq+'`.',
                            DatabaseResponse: rows[0]
                        });
                    }
                    else{
                        return res.status(400).json({
                            ErrorMessage: "User with username `"+usernameReq+"` does not exist."
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        SyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else {
            return res.status(500).json({
                DatabaseError: "Could not connect to MySQL server."
            });
        }
    });
}

// delete an existing user via username

exports.user_delete = (req,res)=>{
    poolDb.getConnection(function (err, connection){
        if(!err){
            var sql = 'CALL deleteUser(?)';
            var usernameReq = req.params.username;
            connection.query(sql,[usernameReq], (err, rows)=>{
                if(!err){
                    res.status(201).json({
                        DeletedUser: 'Successfully deleted user '+usernameReq+'.',
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
    })
}

// user login

exports.user_login = (req, res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            const salt = 15;
            const sql = 'CALL userLogin(?)';
            const usernameReq = req.params.username;
            const passwordReq = req.body.password;

            bcrypt.hash(passwordReq, salt, function (err, hash){
                if(!err){
                    connection.query(sql,[usernameReq], (err, rows)=>{
                        var receivedData = res.json(rows);
                        if(!err){
                            if(hash == receivedData.password){    
                                console.log('I WORK NOW');
                                return res.status(201).json({
                                    LoggedInUser: 'You have been logged in, '+usernameReq+'.',
                                    DatabaseResult: rows[0]
                                });
                            }
                            else{
                                return res.status(401).json({
                                    LoginError: 'Passwords didnt match. Try again.'
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
                        EncryptionError: "There was a problem with encrypting the password."
                    });
                }
        });
    }
    else {
        return res.status(500).json({
            DatabaseError: "Could not connect to MySQL server."
        });
        }
    });
}