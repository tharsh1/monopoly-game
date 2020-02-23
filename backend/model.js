const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new Schema({
    gameId:{type: String , default:shortid.generate()},
    state:{type:Object},
    winner:{type:Object}
});

const game = mongoose.model('games',gameModel);

module.exports = game;