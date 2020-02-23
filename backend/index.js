var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var config = require('./config');
const mongoose = require('mongoose')

mongoose.connect(config.db_url,{useNewUrlParser:true},
    function(err, db) {
        if (err) throw err;
        console.log("Connected to database Successfully!");
      });

app.use(cors())

app.get('/addNewGame',(req,res)=>{
    
});

app.listen(3000);