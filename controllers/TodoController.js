const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

// gets all todo records

exports.todo_getall = (req,res)=>{
    poolDb.getConnection(function (err, connection) {
        if(!err){
            const sql = 'CALL getAllTodos();';
            connection.query(sql, (err, rows)=>{
                if(!err && rows[0].length>0){
                    return res.status(200).json({
                        Todos: rows[0]
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

// searches for a single todo record, with ID

exports.todo_getbyid = (req, res)=>{
    poolDb.getConnection(function (err, connection){
        const sql = 'CALL getTodo(?)';
        var todoID = req.params.todoid;
        if(!err){
            connection.query(sql,[todoID], (err,rows) => {
                if(!err){
                    if(rows[0].length>0){
                        return res.status(200).json({
                            Todo_Data: rows[0]
                        });
                    }
                    else{
                        return res.status(400).json({
                            ErrorMessage: "A todo listing with ID: `"+todoID+"` does not exist."
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

// creates a new todo item

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
                            ErrorMessage: "Todo with id `"+todoidReq+"` does not exist."
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