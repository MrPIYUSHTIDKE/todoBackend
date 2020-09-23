const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

exports.todo_getall = (req,res)=>{
    const sql = 'CALL getAllTodos();';
    poolDb.getConnection(function (err, connection) {
        if(!err){
            connection.query(sql, (err, rows)=>{
                if(!err && rows[0].length>0){
                    return res.status(200).json({
                        Todos: rows[0]
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
                DatabaseError: 'boooi u fked up'
            });
        }
    });
}

exports.todo_getbyid = (req, res)=>{
    const sql = 'CALL getTodo(?)';
    poolDb.getConnection(function (err, connection){
        var todoID = req.params.todoid
        if(!err){
            connection.query(sql,[todoID], (err,rows)=>{
                if(!err){
                    if(rows[0].length>0){
                        return res.status(200).json({
                            Todo_Data: rows[0]
                        });
                    }
                    else{
                        return res.status(404).json({
                            ErrorMessage: "A `ToDo` with ID: "+todoID+" does not exist."
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
                DatabaseError: 'my nig u fked up big time'
            });
        }
    });
}