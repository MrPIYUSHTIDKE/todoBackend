const mysql = require('mysql');
var poolDb;
var dbMetadata = process.env;

module.exports = {
    getPool: function() {
        try {
            if(poolDb) return poolDb;
            poolDb = mysql.createPool({
                host: dbMetadata.host,
                port: dbMetadata.port,
                user: dbMetadata.user,
                password: dbMetadata.password,
                database: dbMetadata.dbName,
                connectionLimit: dbMetadata.allowedConnections
            });
        }
        catch {
            throw new Error("Port 3306 is already in use. A connection to the database already exists.")
        };
        return poolDb;
    }
}