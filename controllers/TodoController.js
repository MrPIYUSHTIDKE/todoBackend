const db = require('../db/dbSingleton.js');
const router = require('../routes/todoRoutes.js');
var poolDb = db.getPool();

// gets all todo records

exports.todo_getall = (req,res)=>{
    poolDb.getConnection(function (err, connection) {
        if(!err){
            const sql = 'CALL getAllTodos();';
            connection.query(sql, (err, rows)=>{
                if(!err && rows[0].length>0){
                    return res.status(200).json({
                        AllTodos: rows[0]
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

// searches for a single todo record using an id

exports.todo_getbyid = (req, res)=>{
    poolDb.getConnection(function (err, connection){
        const sql = 'CALL getTodo(?)';
        var todoID = req.params.todoid;
        if(!err){
            connection.query(sql,[todoID], (err,rows) => {
                if(!err){
                    if(rows[0].length>0){
                        return res.status(200).json({
                            TodoData: rows[0]
                        });
                    }
                    else{
                        return res.status(400).json({
                            NonExistantTodo: "A todo listing with ID: `"+todoID+"` does not exist."
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

// creates a new todo record

exports.todo_create = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            const sql = 'CALL createTodo(?,?,?,?,?)';
            var descriptionReq = req.body.description;
            var dateReq = req.body.date;
            var emailReq = req.body.email;
            var isFavouriteReq = req.body.isFavourite;
            var isFinishedReq = req.body.isFinished;
            connection.query(sql,[descriptionReq,dateReq,emailReq,isFavouriteReq,isFinishedReq], (err, rows) => {
                if(!err){
                    return res.status(201).json({
                        CreatedTodo: 'Successfully created Todo assigned to `'+emailReq+'`.',
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

// deletes a todo record using an id

exports.todo_delete = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var sql = 'CALL deleteTodo(?)';
            var todoidReq = req.params.todoid;
            connection.query(sql,[todoidReq], (err, rows) => {
                if(!err){
                    var numberofrows = rows.affectedRows; 
                    if(numberofrows>0){
                        return res.status(201).json({
                            DeletedTodo: 'Successfully deleted Todo with id `'+todoidReq+'`. Goodbye and good riddance.'
                        });
                    }
                    else {
                        res.status(404).json({
                            NonExistantTodo: "Todo with id `"+todoidReq+"` does not exist."
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

// updates a todo record

exports.todo_update = (req, res) => {

}

// gets all todo records for a specific user

exports.todo_getalltodosperuser = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var sql = 'CALL getAllTodosPerUser(?)';
            var emailReq = req.params.email;
            connection.query(sql,[emailReq],(err,rows) => {
                if(!err){
                    var numberofrows = rows[0].length;
                    if(numberofrows>0){
                        res.status(200).json({
                            TodoData: rows[0]
                        });
                    }
                    else{
                        res.status(404).json({
                            NonExistantUser: "No todos assigned to `"+emailReq+'` because there is no such user, registered with this e-mail.'
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

// gets all favourited todo records for a specific user

exports.todo_getallfavouritesperuser = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var sql = 'CALL getFavouriteTodosPerUser(?)';
            var emailReq = req.params.email;
            connection.query(sql,[emailReq],(err,rows) => {
                if(!err){
                    var numberofrows = rows[0].length;
                    if(numberofrows>0){
                        res.status(200).json({
                            TodoData: rows[0]
                        });
                    }
                    else{
                        res.status(404).json({
                            NonExistantUser: "No favourite todos assigned to `"+emailReq+'` because there is no such user, registered with this e-mail.'
                        });
                    }
                }
                else{
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
    })
}

// gets all finished todo records for a specific user 

exports.todo_getallfinishedperuser = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var sql = 'CALL getFinishedTodosPerUser(?)';
            var emailReq = req.params.email;
            connection.query(sql, [emailReq], (err, rows) => {
                if(!err){
                    var numberofrows = rows[0].length;
                    if(numberofrows>0){
                        res.status(200).json({
                            TodoData: rows[0]
                        });
                    }
                    else{
                        res.status(404).json({
                            NonExistantUser: "No favourite todos assigned to `"+emailReq+'` because there is no such user, registered with this e-mail.'
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

exports.todo_getallnotfinishedperuser = (req,res) => {
    poolDb.getConnection(function (err, connection){
        if(!err){
            var emailReq = req.params.email;
            var sql = 'CALL getNotFinishedTodosPerUser(?)';
            connection.query(sql, [emailReq], (err,rows) => {
                if(!err){
                    var numberofrows = rows[0].length;
                    if(numberofrows>0){
                        res.status(200).json({
                            TodoData: rows[0]
                        });
                    }
                    else{
                        res.status(404).json({
                            NonExistantUser: "No not finished todos assigned to `"+emailReq+'` because there is no such user, registered with this e-mail.'
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