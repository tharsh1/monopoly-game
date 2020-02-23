import React from 'react';
import './playerCard.css';

class PlayerCard extends React.Component{
    constructor(props){
        super(props);
        this.listProperties = this.listProperties.bind(this);
    }

    listProperties(){
        let propertyList = [];
        for(let property of this.props.properties){
            propertyList.push(
                <div>
                    <li>{property.name}
                    <span class="badge">&pound;{property.rent}</span>
                    </li>
                </div>
            );
        }
        return propertyList
    }

    render(){
        return (
            <div className='player1-container' style={{border: `${this.props.currentPlayer ? '2px solid ' + this.props.playerColor : '1px solid gray'}`}}>
                <div className='player1-bar' style={{backgroundColor:this.props.playerColor}}>
                    <div className='player1-name'>
                        {this.props.name}
                    </div>
                    
                    <div className='player1-balance'>
                        {this.props.balance > 0 ? + this.props.balance+'.00' : 'Eliminated'}
                    </div>
                </div>
                <div className='FixedHeightContainer'>
                
                    <div className='player1-property'>
                    <ul class="list-group">
                        {this.listProperties()}
                    </ul> 
                       
                    </div>
                        
                </div>
            </div>
        )
    }
}

export default PlayerCard;