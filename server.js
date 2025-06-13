const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000 ;

const app = express();

app.use(express.json());

const {router} = require('./routes/users');

app.use('/api/v1',router);

const {dbConnect} = require('./config/dbConnect');

dbConnect();

app.listen(port,()=> {
    console.log("Server Connected Succesfully on port :- ",port);
})

app.get('/',(req,res)=> {
    res.send('<h1>Hello from server. </h1>');
})

