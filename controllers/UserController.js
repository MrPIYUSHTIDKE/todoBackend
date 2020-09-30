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
                        AlUsers: rows[0]
                    });
                }
                else {
                    return res.status(404).json({
                        QuerySyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            })
        }
        else{
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
            }); 
        }
    });
}

// gets data about one user, search by username

exports.user_getbyusername = (req,res)=>{
    const sql = 'CALL getUser(?)';
    poolDb.getConnection(function (err, connection) {
        var usernameReq = req.params.username;
        if(!err){
            connection.query(sql, [usernameReq],(err, rows)=>{
                if(!err){
                    if(rows[0].length>0){
                        return res.status(200).json({
                            UserData: rows[0]
                        });
                    }
                    else{
                        return res.status(400).json({
                            NonExistantUser: "User with username `"+usernameReq+"` does not exist."
                        });
                    }
                }
                else{
                    return res.status(404).json({
                        QuerySyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
            }); 
        }
    });
}

// creates a new user and encrypts the password

exports.user_register = (req,res)=>{
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
            connection.query(sql,[emailReq,usernameReq,nameReq,surnameReq,hashedPassword], (err,rows)=>{
                if(!err){
                    return res.status(201).json({
                        CreatedUser: 'User with e-mail `'+emailReq+'` created successfully! Welcome aboard, '+nameReq+".",
                        DatabaseResponse: rows[0]
                    });
                }
                else{
                    return res.status(404).json({
                        QuerySyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
            }); 
        }
    });
}

// update username via username. Use current (old) username and add a `username` paramater in the body, storing the value of the new username

exports.user_changeusername = (req,res)=>{
    poolDb.getConnection(function(err, connection){
        if(!err){
            var sql = 'CALL updateUsername(?,?)';
            var oldUsername = req.body.oldUsername;
            var usernameReq = req.body.username;
            connection.query(sql,[oldUsername,usernameReq], (err, rows)=>{
                var rowsNumber = rows.affectedRows;
                if(!err){
                    if(rowsNumber>0){
                        res.status(201).json({
                            UpdatedUser: 'Successfully changed username to `'+usernameReq+'`.',
                            DatabaseResponse: rows[0]
                        });
                    }
                    else{
                        return res.status(404).json({
                            NonExistantUser: "User with username `"+oldUsername+"` does not exist."
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        QuerySyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else {
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
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
                    var numberofrows = rows.affectedRows;
                    if(numberofrows>0){
                        res.status(201).json({
                            DeletedUser: 'Successfully deleted user. Goodbye and good riddance, `'+usernameReq+'`.'
                        });
                    }
                    else {
                        res.status(404).json({
                            NonExistantUser: "User with username `"+usernameReq+"` does not exist."
                        });
                    }
                   
                }
                else{
                    return res.status(404).json({
                        QuerySyntaxError: "There was a problem executing the query. Check the SQL syntax or the procedure itself."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
            }); 
        }
    })
}

// user login

exports.user_login = (req, res) => {

        // REWRITE THE WHOLE METHOD. bcrypt.compare / bcrypt.hashSync

}

// changes password of a user, by username in params

exports.user_changepassword = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var usernameReq = req.params.username;
            var newPassword = req.body.newpassword;
            var sql = 'CALL updatePassword(?,?)';
            connection.query(sql,[usernameReq, newPassword], (err, rows)=>{
                if(!err){
                    res.status(201).json({
                        UpdatedPasswordMessage: 'Successfully changed password for user `'+usernameReq+'`.',
                        DatabaseResponse: rows[0]
                    });
                }
                else {
                    return res.status(400).json({
                        NonExistantUser: "User with username `"+usernameReq+"` does not exist."
                    });
                }
            });
        }
        else{
            return res.status(500).json({
                DatabaseConnectionError: "Could not connect to MySQL server. Check if port 3306 is on or busy."
            }); 
        }
    })
}