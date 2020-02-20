import React from 'react';
import './playerCard.css';

class PlayerCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='player1-container' style={{border: `${this.props.currentPlayer ? '2px solid green': '1px solid gray'}`}}>

            </div>
        )
    }
}

export default PlayerCard;