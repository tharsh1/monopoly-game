import React from 'react';
import './dice.css';
import './diceStates'
import diceStates from './diceStates';
class Dice extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            diceState:{dice1:diceStates[1],dice2:diceStates[2]}
        };
        this.rollDice = this.rollDice.bind(this);
        this.once = true;

    }
    
    rollDice(){

        const dice1Val = Math.floor(Math.random() * 6)+1;
        const dice2Val = Math.floor(Math.random() * 6)+1;

        this.setState({modalIsOpen : true});
        this.setState({diceState :{dice1: diceStates[dice1Val], dice2:diceStates[dice2Val]}});
        // if(!this.once){
            this.props.movePawn(this.props.player,dice1Val,dice2Val);
        // }else{
        //     this.props.movePawn(this.props.player,10,0);
        //     this.once = false;
        // }
        // if(this.state.currentPlayer.id !== this.props.players.length){
        //     this.setState({currentPlayer : this.props.players[this.state.currentPlayer.id]});
        // }
        // else{
        //     this.setState({currentPlayer : this.props.players[0]})
        // }
    }
    render(){
        return(
            
        <div className="dicearea">
             
              <div className="dice-container">
                  <div className="dice1-container">
                      <img id="dice1" src = {this.state.diceState.dice1} alt=""/>
                  </div>
                  <div className="dice2-container">
                      <img id="dice2" src = {this.state.diceState.dice2} alt=""/>
                  </div>
              </div>
              <div className="rollbtn-container">
                  <button className="rollbtn" onClick = {this.rollDice}>Roll Dice</button>
              </div>

              <div>{this.props.text}'s turn</div>
          </div>
        );
    }
}

export default Dice;