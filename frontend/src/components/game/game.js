import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import _ from 'lodash';

import Dice from '../dice/dice';
import Card from '../card/Card';
import Modal from '../modal/modal'

import PlayerCard from '../playerCard/PlayerCard'
import player1 from '../../resources/red-pawn.svg';
import player2 from '../../resources/green-pawn.svg';
import player3 from '../../resources/blue-pawn.svg';
import player4 from '../../resources/yellow-pawn.svg';
import buyicon from '../../resources/buyicon.svg';

import blocks from '../../utils/blockList'; 
import chance from '../../utils/chanceList';
import communityChest from '../../utils/communityChestList';
import emptyState from '../../utils/emptyState';

import './game.css';
import 'react-toastify/dist/ReactToastify.css';

import config from '../../config';
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newGameModelOpen:true,
      playersModelOpen:false,
      propBuyModalOpen:false,
      chanceModalOpen:false,
      communiyModelOpen:false,
      winnerModalOpen:false,
      blocks ,
      currentChance:{},
      currentCommunity:{},
      currentBlock:{},
      currentPlayer : 0,
      cardState:{
        color:'',
        name:'',
        rent:0,
        price:0
      },
      players:[
        {id:0,name: "Player 1",playerColor:'red',position: 0,balanceMoney: 15000,properties:[],rounds:0, steps:0},
        {id:1,name: "Player 2",playerColor:'green',position: 0,balanceMoney:15000,properties:[],rounds:0, steps:0},
        {id:2,name: "Player 3",playerColor:'blue',position:0,balanceMoney: 15000,properties:[],rounds:0, steps:0},
        {id:3,name: "Player 4",playerColor:"yellow",position:0,balanceMoney: 15000,properties:[],rounds:0, steps:0}
      ],
      playerNames:[{name:'Player1',color:'darkred'},{name:'Player2',color:'green'},{name:'Player3',color:'blue'},{name:'Player4',color:'black'}]
    };

    this.movePawn = this.movePawn.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectPawn = this.selectPawn.bind(this);
    this.applyLogic = this.applyLogic.bind(this);
    this.buyProperty = this.buyProperty.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.eliminatePlayer = this.eliminatePlayer.bind(this);
    this.processChance = this.processChance.bind(this);
    this.processCommunityChest = this.processCommunityChest.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.saveState = this.saveState.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.closeNewGameModal = this.closeNewGameModal.bind(this);
  }

  componentDidMount(){
    document.title= 'MONOPOLY'
    try{
      const gameState = JSON.parse(localStorage.gameState);
      this.setState(gameState)
      toast("GAME " + localStorage.currentGameId + " LOADED",{type: toast.TYPE.INFO})
      console.log(this.state)
    
    }
    catch(err){
      console.log(err)
    }
  }

  movePawn(player,dice1,dice2){
    const blocks = this.state.blocks;
    const players = this.state.players;
    let newPlayerPosition = (players[player].position + dice1 + dice2) % 40;
    players[player].steps += dice1 + dice2;
    if(players[player].steps/40 > players[player].rounds){
      players[player].rounds++;
      players[player].balanceMoney += 200;
    }

    blocks[players[player].position].playersOnBlock = _.filter(blocks[players[player].position].playersOnBlock , (obj)=>{
      return obj !== players[player].id;
    });
    blocks[newPlayerPosition].playersOnBlock.push(players[player].id);
    players[player].position = newPlayerPosition;
    this.setState({players,blocks , currentBlock: blocks[newPlayerPosition] , currentPlayer:player});


    this.applyLogic(player, newPlayerPosition);

  }

  selectPawn(blockId){
    const playersOnBlock = this.state.blocks[blockId-1].playersOnBlock
    let pawns = [];
    const pawnImgs = [player1,player2,player3,player4]
    for (const player of playersOnBlock){
      pawns.push(<img key={player} src = {pawnImgs[player]} alt=""/>);
    }
    return pawns
  }

  applyLogic(player, newPlayerPosition){
    const players = this.state.players;
    const blockInfo = this.state.blocks[newPlayerPosition];
    if(blockInfo.type === 'PROPERTY'){
      if(blockInfo.ownedBy === undefined){
        this.setState(
          {
            propBuyModalOpen:true,
            cardState:{
              name:blockInfo.name,
              color:blockInfo.color,
              rent:blockInfo.rent || 1000,
              price:blockInfo.cost || 3000
            }
          }
        );
      }else{
        const currentPlayer = players[player];
        const ownerIndex = _.findIndex(players,player=>{
          return player.id === blockInfo.ownedBy
        });
        const owner = players[ownerIndex];
        currentPlayer.balanceMoney -= blockInfo.rent;
        owner.balanceMoney += blockInfo.rent;
        owner.balanceMoney = owner.balanceMoney.toFixed(2)
        toast('rent of ' + blockInfo.rent + ' paid to ' + owner.name + ' from ' + currentPlayer.name,{type:toast.TYPE.INFO});
        if(players[player].balanceMoney <=0){
          this.eliminatePlayer(player,players)
        }else{
          this.nextPlayer(false,player,players)
        }
        players[player] = currentPlayer;
        players[ownerIndex] = owner;
        this.setState({players});
        console.log(this.state.players);
      }
      
    }
    else if(blockInfo.type === 'JAIL'){
      players[player].balanceMoney -=3000;
      if(players[player].balanceMoney <=0){
        this.eliminatePlayer(player,players)
      }else{
        this.nextPlayer(false,player,players)
      }
    }
    else if(blockInfo.type === 'CHANCE'){
      const rand = Math.floor(Math.random() * chance.length);
      const currentChance = chance[rand];
      this.setState({
        modalName:'CHANCE CARD',
        chanceModalOpen:true,
        currentChance
      });
      
    }
    else if(blockInfo.type === 'COMMUNITY_CHEST'){
      const rand = Math.floor(Math.random() * chance.length);
      const currentCommunity = communityChest[rand];
      this.setState({
        modalName:'COMMUNITY CHEST CARD',
        communityModalOpen:true,
        currentCommunity
      });
      
    }
    else if(blockInfo.type === 'INCOME_TAX'){
      players[player].balanceMoney -=493;
      if(players[player].balanceMoney <=0){
        this.eliminatePlayer(player,players)
      }else{
        this.nextPlayer(false,player,players)
      }
    }
    else if(blockInfo.type === 'SUPER_TAX'){
      players[player].balanceMoney -=2662;
      if(players[player].balanceMoney <=0){
        this.eliminatePlayer(player,players)
      }else{
        this.nextPlayer(false,player,players)
      }
    }
    else if(blockInfo.type === 'GO_TO_JAIL'){
      const currentChance = chance[1]
      this.setState({
        modalName:'GO TO JAIL',
        chanceModalOpen:true,
        currentChance
      });
    }
    else{
      this.nextPlayer(false,player,players)
    }
  }

  async eliminatePlayer(player,players){
    const blocks = this.state.blocks;
    toast(players[player].name + " is eliminated",{type:toast.TYPE.ERROR});
    const propertiesOwned = _.map(players[player].properties,obj => obj.id);
    for(let property of propertiesOwned){
      blocks[property-1].ownedBy = undefined;
    }
    this.setState({blocks});
    players.splice(player,1);
    if(players.length === 1){
      this.setState({winnerModalOpen:true});
      this.setState({winner: players[0].name})
      const response = await axios.post(
        config.host +'/saveGame' ,
        {
          gameId: localStorage.currentGameId , 
          state: this.state , 
          winner: this.state.winner
        }
      );
      localStorage.setItem('gameState',JSON.stringify(this.state));
    }
    this.nextPlayer(true,player,players);
  }

  nextPlayer(deletedthis , currentPlayer , players){
    if(deletedthis){
      if(players.length - 1 === currentPlayer){
        this.setState({currentPlayer:0,players});
      }else{
        this.setState({currentPlayer,players});
      }
    }
    else{
      this.setState({currentPlayer: (currentPlayer + 1)%players.length , players})
    }
  }
  closeModal(){
    this.setState({propBuyModalOpen:false});
    this.nextPlayer(false , this.state.currentPlayer , this.state.players);
  }

  buyProperty(){
    const players = this.state.players;
    const blocks = this.state.blocks;
    const currPlayer = players[this.state.currentPlayer];
    const balance = currPlayer.balanceMoney;
    const currentBlock = this.state.currentBlock;
    if(currentBlock.cost < balance ){
      currPlayer.balanceMoney -= currentBlock.cost;
      currPlayer.properties.push(currentBlock);
      currentBlock.ownedBy = players[this.state.currentPlayer].id;
      blocks[currentBlock.id-1] = currentBlock;
      players[this.state.currentPlayer] = currPlayer;
      this.setState({blocks,players});
      this.closeModal();
    }
    else{
      toast('You do not have enough money.',{type: toast.TYPE.WARNING});
      this.closeModal();
    }
    this.nextPlayer(false , this.state.currentPlayer , players);
  }

  processChance(){
    this.setState({chanceModalOpen:false});
    if(this.state.currentChance.move){
      const finalPosition = this.state.currentChance.goToPosition;
      const currentPosition = this.state.players[this.state.currentPlayer].position;
      let moves = 0;
      if(finalPosition > currentPosition){
        moves = finalPosition-currentPosition;
      }
      else{
        moves = (40-currentPosition) + finalPosition;
      }
      this.movePawn(this.state.currentPlayer , moves,0);
    }
    else{
      const player = this.state.currentPlayer;
      const players = this.state.players;
      if(this.state.currentChance.buttonTag === 'PAY'){
        players[player].balanceMoney -=this.state.currentChance.pay;
        players[player].balanceMoney = players[player].balanceMoney.toFixed(2)
        if(players[player].balanceMoney <=0){
          this.eliminatePlayer(player,players)
        }else{
          this.nextPlayer(false,player,players)
        }
      }
      else if(this.state.buttonTag === 'COLLECT'){
        players[player].balanceMoney +=this.state.currentChance.pay;
        
      }
      else{
        this.nextPlayer(false,player,players)
      }
    }
  }

  processCommunityChest(){
    this.setState({communityModalOpen:false});
    if(this.state.currentCommunity.move){
      const finalPosition = this.state.currentCommunity.goToPosition;
      const currentPosition = this.state.players[this.state.currentPlayer].position;
      let moves = 0;
      if(finalPosition > currentPosition){
        moves = finalPosition-currentPosition;
      }
      else{
        moves = (40-currentPosition) + finalPosition;
      }
      this.movePawn(this.state.currentPlayer , moves,0);
    }
    else{
      const player = this.state.currentPlayer;
      const players = this.state.players;
      if(this.state.currentCommunity.buttonTag === 'PAY'){
        players[player].balanceMoney -=this.state.currentCommunity.pay;
        players[player].balanceMoney = players[player].balanceMoney.toFixed(2)
        if(players[player].balanceMoney <=0){
          this.eliminatePlayer(player,players)
        }else{
          this.nextPlayer(false,player,players)
        }
      }
      else if(this.state.currentCommunity.buttonTag === 'COLLECT'){
        players[player].balanceMoney +=this.state.currentCommunity.get;
        
      }
      else{
        this.nextPlayer(false,player,players)
      }
    }
  }

  getPlayer(playerId){
    const player = this.state.players.find(player=>player.id === playerId);
    if(player !== undefined){
      return {properties:player.properties , balance: player.balanceMoney}
    }
    else{
      return{properties:[], balance:0}
    }
    
  }

  async saveState(){
    localStorage.setItem('gameState',JSON.stringify(this.state));
    const response = await axios.post(config.host +'/saveGame' ,{gameId: localStorage.currentGameId , state: this.state , winner: this.state.winner});
    toast('GAME SAVED SUCCESSFULLY',{type:toast.TYPE.SUCCESS});
  }

  async exitGame(){
    const sure = window.confirm('Are you sure you want to exit');
    if(sure){
      
      const save = window.confirm('do you want to save your game? ');
      if(save){
        localStorage.setItem('gameState' , JSON.stringify(this.state));
        const response = await axios.post(config.host +'/saveGame' ,{gameId: localStorage.currentGameId , state: this.state , winner: this.state.winner});
      }
      else{
        localStorage.removeItem('gameState');
      }
      this.setState({newGameModelOpen:true})
    }
  }

  closeNewGameModal(){
    this.setState({newGameModelOpen:false,playersModelOpen:true})
  }
  playerOnChange =  (e)=>{
    const {players,playerNames} = this.state
    players[e.target.name].name = e.target.value;
    playerNames[e.target.name].name = e.target.value;
    emptyState.players[e.target.name].name = e.target.value;
    this.setState({players,playerNames});
  }

  startGame = async (e)=>{
    e.preventDefault();
    const response = await axios.post(
      config.host + '/startNewGame',
      {
          state: emptyState,
          winner:null
      }
    );
    alert('Use game Id: ' + response.data.gameId);
    localStorage.setItem('currentGameId', response.data.gameId);
    const gameState = this.state;
    gameState.newGameModelOpen = true;
    // localStorage.setItem('gameState',JSON.stringify(gameState));
    this.setState(emptyState);
    toast('NEW GAME STARTED',{type:toast.TYPE.SUCCESS});
  }

  openNewGameModal = ()=>{
    this.setState({newGameModelOpen:true , winnerModalOpen :false})
    localStorage.removeItem('gameState')
  }



  render(){
    return (
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
      />

      <Modal className="login-container"
        hidden = {true}
        show = {this.state.newGameModelOpen}
      >
          <h1>Monopoly London</h1>
          <button class="newGameBtn">Resume Game</button>
          <button onClick={this.closeNewGameModal} class="loadGameBtn">New Game</button>
          
      </Modal>
      <Modal className="players-container"
        hidden = {true}
        show = {this.state.playersModelOpen}
      >
          <h1>Enter Player Details</h1>
          <form method='post' className="players-form" onSubmit = {this.startGame}>
            <input className="player-red-field" onChange={this.playerOnChange} value={this.state.playerNames[0].name} type="text" name="0" placeholder="Enter Red Player Name"></input><br></br>
            <input className="player-green-field" onChange={this.playerOnChange} value={this.state.playerNames[1].name} type="text" name="1" placeholder="Enter Green Player Name"></input><br></br>
            <input className="player-blue-field" onChange={this.playerOnChange} value={this.state.playerNames[2].name} type="text" name="2" placeholder="Enter Blue Player Name"></input><br></br>
            <input className="player-yellow-field" onChange={this.playerOnChange} value={this.state.playerNames[3].name} type="text" name="3" placeholder="Enter Yellow Player Name"></input><br></br>
            <input className="startGameBtn" type="submit"  value="Start Game"></input>
          </form>
          
      </Modal>
        <Modal
          show = {this.state.propBuyModalOpen}
          handleClose = {this.closeModal}
        >
          <Card
           color={this.state.cardState.color}
           name={this.state.cardState.name}
           rent={this.state.cardState.rent}
           price={this.state.cardState.price} 
          /> 
          
          <div className='buy-modal-right'>
            <div className = 'buybox' onClick={this.buyProperty}>
              <div>
                <img src={buyicon} alt=""/>
                <span>BUY PROPERTY</span>
              </div>
            </div>
            <div className='pass' onClick={this.closeModal}>PASS</div>
          </div>
          
        </Modal>

        <Modal className='chance-modal'
          hidden={true}
          show={this.state.chanceModalOpen}
        >
          <div>{this.state.modalName}</div>
          <span>{this.state.currentChance.description}</span>
          <button onClick={this.processChance}>{this.state.currentChance.buttonTag}</button>
        </Modal>

        <Modal className='chance-modal'
          hidden={true}
          show={this.state.communityModalOpen}
        >
          <div>{this.state.modalName}</div>
          <span>{this.state.currentCommunity.description}</span>
          <button onClick={this.processCommunityChest}>{this.state.currentCommunity.buttonTag}</button>
        </Modal>

        {/* <Modal className='chance-modal'
          hidden={true}
          show={this.state.saveStateOpen}
        >
          <span></span>
          <button onClick={this.processChance}>OK</button>
        </Modal> */}
        <Modal
          className='winner-modal'
          show = {this.state.winnerModalOpen}
          hidden={true}
        >
          <h2>{this.state.players[0].name} is the winner.</h2>
          <button onClick={this.openNewGameModal}>END GAME</button>
        </Modal>
        <div className="main">
          <div className="linetop blocks">
                <div id = "31" className="corner">
                  {this.selectPawn(31)}
                </div>
                <div id = "32">{this.selectPawn(32)}v</div>
                <div id = "33">{this.selectPawn(33)}</div>
                <div id = "34">{this.selectPawn(34)}</div>
                <div id = "35">{this.selectPawn(35)}</div>
                <div id = "36">{this.selectPawn(36)}</div>
                <div id = "37">{this.selectPawn(37)}</div>
                <div id = "38">{this.selectPawn(38)}</div>
                <div id = "39">{this.selectPawn(39)}</div>
                <div id = "40">{this.selectPawn(40)}</div>
                <div id = "1" className="corner">{this.selectPawn(1)}</div>
            </div>
            <div className="lineleft blocks">
                <div className="corner"></div>
                <div id = "30">{this.selectPawn(30)}</div>
                <div id = "29">{this.selectPawn(29)}</div>
                <div id = "28">{this.selectPawn(28)}</div>
                <div id = "27">{this.selectPawn(27)}</div>
                <div id = "26">{this.selectPawn(26)}</div>
                <div id = "25">{this.selectPawn(25)}</div>
                <div id = "24">{this.selectPawn(24)}</div>
                <div id = "23">{this.selectPawn(23)}</div>
                <div id = "22">{this.selectPawn(22)}</div>
                <div className="corner"></div>
            </div>
            <div className="lineright lineleft blocks">
                <div className="corner"></div>
                <div id = "2">{this.selectPawn(2)}</div>
                <div id = "3">{this.selectPawn(3)}</div>
                <div id = "4">{this.selectPawn(4)}</div>
                <div id = "5">{this.selectPawn(5)}</div>
                <div id = "6">{this.selectPawn(6)}</div>
                <div id = "7">{this.selectPawn(7)}</div>
                <div id = "8">{this.selectPawn(8)}</div>
                <div id = "9">{this.selectPawn(9)}</div>
                <div id = "10">{this.selectPawn(10)}</div>
                <div className="corner"></div>
            </div>
            <div className="linetop blocks">
                <div id = "21" className="corner">{this.selectPawn(21)}</div>
                <div id = "20">{this.selectPawn(20)}</div>
                <div id = "19">{this.selectPawn(19)}</div>
                <div id = "18">{this.selectPawn(18)}</div>
                <div id = "17">{this.selectPawn(17)}</div>
                <div id = "16">{this.selectPawn(16)}</div>
                <div id = "15">{this.selectPawn(15)}</div>
                <div id = "14">{this.selectPawn(14)}</div>
                <div id = "13">{this.selectPawn(13)}</div>
                <div id = "12">{this.selectPawn(12)}</div>
                <div id = "11" className="corner">{this.selectPawn(11)}</div>
            </div>
          </div>
          

  
      <div className="right">
          <div className="appbar">
              <button onClick={this.saveState} className="appbtn">Save Game</button>
              <button onClick = {this.exitGame} className="appbtn">Exit Game</button>

          </div>
  
          <div className="content">
              <div className="player-row1">
                  <PlayerCard 
                    playerColor={this.state.playerNames[0].color} 
                    currentPlayer={this.state.players[this.state.currentPlayer].id === 0}
                    properties = {this.getPlayer(0).properties}
                    name = {this.state.playerNames[0].name}
                    balance = {this.getPlayer(0).balance}
                  />
                  <PlayerCard 
                    playerColor={this.state.playerNames[1].color} 
                    currentPlayer={this.state.players[this.state.currentPlayer].id === 1}
                    properties = {this.getPlayer(1).properties}
                    name = {this.state.playerNames[1].name}
                    balance = {this.getPlayer(1).balance}
                  />
              </div>
              <div className="player-row2">
                  <PlayerCard
                    playerColor={this.state.playerNames[2].color}
                    currentPlayer={this.state.players[this.state.currentPlayer].id === 2}
                    properties = {this.getPlayer(2).properties}
                    name = {this.state.playerNames[2].name}
                    balance = {this.getPlayer(2).balance}
                  />
                  <PlayerCard 
                    playerColor={this.state.playerNames[3].color} 
                    currentPlayer={this.state.players[this.state.currentPlayer].id === 3}
                    properties = {this.getPlayer(3).properties}
                    name = {this.state.playerNames[3].name}
                    balance = {this.getPlayer(3).balance}
                  />    
              </div>
          </div>
         
          <Dice 
            movePawn = {this.movePawn}
            player = {this.state.currentPlayer}
            text={this.state.players[this.state.currentPlayer].name}
          />
          
      </div>
      </div>
    );
  }
  
}

export default Game;
