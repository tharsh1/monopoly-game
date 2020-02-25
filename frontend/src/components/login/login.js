import React from 'react';
import './login.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {gameIdDisplay:true};
        this.gameIDShow = this.gameIDShow.bind(this);
        this.loadGame = this.loadGame.bind(this);
    }

    gameIDShow(){
        this.setState({gameIdDisplay:false});
    }

    loadGame(){
        
    }
    

    render(){
        return (
            <div class="login-container">
            <span class="gameName"> Monopoly Game</span>
                <button class="newGameBtn">New Game</button><br/>
                <button class="loadGameBtn" onClick={this.gameIDShow}>Load Game</button><br/>
                <form onSubmit = {this.loadGame}>
                    <input class="IDField" id="gameID" hidden= {this.state.gameIdDisplay} type="text" name="gameId" value="" placeholder="Enter Game ID" />
                </form>
           
            </div>
        );
    }
}

export default Login;