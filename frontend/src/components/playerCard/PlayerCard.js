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
                <div key={property.id}>
                    <li>
                        <div className='propertyname'>{property.name}</div>
                        <span className="badge">&pound;{property.rent}</span>
                    </li>
                </div>
            );
        }
        return propertyList
    }

    render(){
        return (
            <div className='player-container' style={{border: `${this.props.currentPlayer ? '2px solid ' + this.props.playerColor : '1px solid gray'}`}}>
                <div className='player-bar' style={{backgroundColor:this.props.playerColor}}>
                    <div className='player-name'>
                        {this.props.name}
                    </div>
                    
                    <div className='player-balance'>
                        {this.props.balance > 0 ? + this.props.balance.toFixed(2) : 'Eliminated'}
                    </div>
                </div>
                <div className='FixedHeightContainer'>
                
                    <div className='player-property'>
                    <ul className="list-group">
                        {this.listProperties()}
                    </ul> 
                       
                    </div>
                        
                </div>
            </div>
        )
    }
}

export default PlayerCard;