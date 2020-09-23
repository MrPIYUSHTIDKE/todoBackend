// library imports

const express = require('express');
const ip = require('ip');
const path = require('path');
const favicon = require('serve-favicon');

// variables

const dbMetadata = process.env;
const portNumber = 8000;
const app = express();

// route paths

const TodoRoutes = require('./routes/todoRoutes');
const UserRoutes = require('./routes/userRoutes');

// setting up headers, accepted data, methods, cookies

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

// setting up the port for the connection

app.set('port', (dbMetadata.port || portNumber));

// setting up an icon

app.use(favicon(path.join(__dirname,'resources','images','todoicon.ico')));

// setting up the base routes for the server to navigate

app.use('/user', UserRoutes);
app.use('/todo', TodoRoutes);

// start the server

app.listen(portNumber, ()=>{
    console.log('Server running! You can connect by opening http://'+ip.address()+":"+portNumber+". Or http://localhost:"+portNumber);
});
