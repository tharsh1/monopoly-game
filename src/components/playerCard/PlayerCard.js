import React from 'react';
import './playerCard.css';

class PlayerCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='player1-container' style={{border: `${this.props.currentPlayer ? '2px solid green': '1px solid gray'}`}}>
                <div className='player1-bar'>
                    <div className='player1-name'>
                        {this.playerName}
                    </div>
                    
                    <div className='player1-balance'>
                        {this.balance}
                    </div>
                </div>
                <div className='FixedHeightContainer'>
                
                    <div className='player1-property'>
                    <ul class="list-group">
                        <div id='property1'>
                        <li>Mumbai
                        <span class="badge">100000</span>
                        </li>
                        </div>
                        
                        <div id='property2'>
                        <li>Pune
                        <span class="badge">40000</span>
                        </li>
                        </div>
                        
                        <div id='property3'>
                        <li>Nashik
                        <span class="badge">25000</span>
                        </li>
                        </div>
                        
                        <div id='property4'>
                        <li>Navi Mumbai
                        <span class="badge">33000</span>
                        </li>
                        </div>
                        
                        <div id='property5'>
                        <li>Bangalore
                        <span class="badge">44000</span>
                        </li>
                        </div>
                        
                        <div id='property6'>
                        <li>Kolkata
                        <span class="badge">Free</span>
                        </li>
                        </div>
                        
                    </ul> 
                       
                    </div>
                        
                </div>
            </div>
        )
    }
}

export default PlayerCard;