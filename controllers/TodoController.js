const db = require('../db/dbSingleton.js');
var poolDb = db.getPool();

exports.todo_getall = (req,res)=>{
    const sql = 'CALL getAllTodos();';
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