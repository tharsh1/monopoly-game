import React from 'react';
import Dice from './components/dice/dice';
import Card from './components/card/Card';
import Modal from './components/modal/modal'
import player1 from './resources/red-pawn.svg';
import player2 from './resources/green-pawn.svg';
import player3 from './resources/blue-pawn.svg';
import player4 from './resources/yellow-pawn.svg';
import PlayerCard from './components/playerCard/PlayerCard'
import blocks from './utils/blockList'
import _ from 'lodash';
import buyicon from './resources/buyicon.svg';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      propBuyModalOpen:false,
      blocks , 
      currentBlock:{},
      currentPlayer : 0,
      cardState:{
        color:'',
        name:'',
        rent:0,
        price:0
      },
      players:[
        {id:0,name: "deepanshu",position: 0,balanceMoney: 3000,properties:[]},
        {id:1,name: "abc",position: 0,balanceMoney:3000,properties:[]},
        {id:2,name: "def",position:0,balanceMoney: 3000,properties:[]},
        {id:3,name: "ghi",position:0,balanceMoney: 3000,properties:[]}]
    };

    this.movePawn = this.movePawn.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectPawn = this.selectPawn.bind(this);
    this.applyLogic = this.applyLogic.bind(this);
    this.buyProperty = this.buyProperty.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    // this.displayBuyModal = this.displayBuyModal.bind(this);
  }

  componentDidMount(){
    document.title= 'MONOPOLY'
  }

  movePawn(player,dice1,dice2){
    console.log(player);
    const blocks = this.state.blocks;
    const players = this.state.players;
    let newPlayerPosition = (players[player].position + dice1 + dice2) % 40;

    blocks[players[player].position].playersOnBlock = _.filter(blocks[players[player].position].playersOnBlock , (obj)=>{
      return obj !== players[player].id;
    });
    blocks[newPlayerPosition].playersOnBlock.push(players[player].id);
    players[player].position = newPlayerPosition;
    this.setState({blocks , currentBlock: blocks[newPlayerPosition] , currentPlayer:player});


    this.applyLogic(player, newPlayerPosition);
    // console.log(this.state.currentPlayer);
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
      // this.displayBuyModal(playerInfo,blockInfo);
      this.setState(
        {
          propBuyModalOpen:true,
          cardState:{
            name:blockInfo.name,
            color:blockInfo.color,
            rent:blockInfo.rent || 1000,
            price:blockInfo.price || 3000
          }
        }
      );
      this.nextPlayer(false , player , players);
    }
    else if(blockInfo.type === 'JAIL'){
      players[player].balanceMoney -=3000;
      if(players[player].balanceMoney <=0){
        players.splice(player,1);
        console.log(players)
        this.nextPlayer(true,player,players)
      }else{
        this.nextPlayer(false,player,players)
      }
    }
    else{
      this.nextPlayer(false,player,players)
    }
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
    this.setState({propBuyModalOpen:false})
  }

  buyProperty(){

    this.closeModal()
    // alert('buy');
  }
  render(){
    console.log(this.state.currentPlayer)
    return (
      <div className="App">
        <Modal
          show = {this.state.propBuyModalOpen}
          // show = {true}
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
                <img src={buyicon}/>
                <span>BUY PROPERTY</span>
              </div>
            </div>
            <div className='pass' onClick={this.closeModal}>PASS</div>
          </div>
          
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
              <button className="appbtn">Save Game</button>
              <button className="appbtn">Load Game</button>
              <button className="appbtn">Exit Game</button>
          </div>
  
          <div className="content">
              <div className="player-row1">
                  <PlayerCard currentPlayer={this.state.players[this.state.currentPlayer].id === 0}/>
                  <PlayerCard  currentPlayer={this.state.players[this.state.currentPlayer].id === 1}/>
              </div>
              <div className="player-row2">
                  <PlayerCard currentPlayer={this.state.players[this.state.currentPlayer].id === 2}/>
                  <PlayerCard currentPlayer={this.state.players[this.state.currentPlayer].id === 3}/>    
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

export default App;
