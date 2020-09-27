// library imports

const express = require('express');
const ip = require('ip');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// constants

const TodoRoutes = require('./routes/todoRoutes');
const UserRoutes = require('./routes/userRoutes');
const dbMetadata = process.env;
const portNumber = 8000;
const app = express();

// setting up middleware (headers, accepted data, bodyparser, handling `options` http method, cookies)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
      res.header('Access-Control-Allow-Methods',
      'Put, Post, Patch, Delete, Get');
      return res.status(200).json({});
    }
    next();
  });

// setting up the base routes for the server to navigate

app.use('/user', UserRoutes);
app.use('/todo', TodoRoutes);

// setting up the port for the connection

app.set('port', (dbMetadata.port || portNumber));

// setting up an icon

app.use(favicon(path.join(__dirname,'resources','images','todoicon.ico')));

// start the server

app.listen(portNumber, ()=>{
    console.log('Server running! You can connect by opening http://'+ip.address()+":"+portNumber+". Or http://localhost:"+portNumber);
});
