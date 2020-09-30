/* 
                                                                     !! INFO & PURPOSE !!
?? This class acts as a Singleton for the mysql server's connection. 
?? We need it because the database is query based, meaning we have to provide a connection string (host, pswrd, user, port, dbName) in order
?? to successfully send the query and get the response. If we dont have this class, we will have to open and close the connection every time
?? we send a request, and this is unpractical, it doesn't work properly and it causes problems. We don't want this.

 TODO secure the class so it cannot leak the server data through cyber-attacks

*/

/*
?? the 'getPool()' is our singleton method which checks if a connection to the server
?? already exists, if not, it will create it and it will return the connection object which is of type 'Pool'.

?? By exporting the module and accessing it from server.js, I am ensuring that 
?? a connection is always up and running, thanks to the principles of OOP.
*/


// code

const mysql = require('mysql');
var poolDb;
var Metadata = process.env;

module.exports = {
    getPool: function() {
        try {
            if(poolDb) return poolDb;
            poolDb = mysql.createPool({
                host: Metadata.host,
                port: Metadata.DBport,
                user: Metadata.user,
                password: Metadata.password,
                database: Metadata.dbName,
                connectionLimit: Metadata.allowedConnections
            });
        }
        catch {
            throw new Error("Port 3306 is already in use. Could not connect to database.")
        };
        return poolDb;
    }
}