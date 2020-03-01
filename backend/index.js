var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');
var config = require('./config');
const mongoose = require('mongoose');
const game = require('./model');
var bodyParser = require('body-parser');
const shortid = require('shortid');


app.use(bodyParser())

mongoose.connect(config.db_url,{useNewUrlParser:true,useUnifiedTopology:true},
    function(err, db) {
        if (err) throw(err);
        console.log("Connected to database Successfully!");
      });

app.use(cors())

app.post('/startNewGame', async (req,res)=>{
    // console.log(req.body)
    var save = await game.create({gameId : shortid.generate(),state:req.body.state , winner:req.body.winner});
    res.send(save)
});

app.post('/saveGame' , async (req,res)=>{
    try{
        var set = await game.findOneAndUpdate(
            {
                gameId: req.body.gameId
            },
            {
                $set: {
                    state: req.body.state,
                    winner: req.body.winner
                }
            }
        );
        res.send({code:1 , message: "game saved"});
    }catch(error){
        res.send({code:0 , message: "something went wrong"});
    }
    

    res.send({})
});

app.listen(3000);