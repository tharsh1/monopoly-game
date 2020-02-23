var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var config = require('./config');
const mongoose = require('mongoose');
const game = require('./model');

mongoose.connect(config.db_url,{useNewUrlParser:true,useUnifiedTopology:true},
    function(err, db) {
        if (err) throw err;
        console.log("Connected to database Successfully!");
      });

app.use(cors())

app.post('/saveGame',async (req,res)=>{
    var save = await game.create({state:req.body.state , winner:req.body.winner});
    res.send(save)
});

app.listen(3000);