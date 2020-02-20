import React from 'react'
import './card.css'

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div className='card'>
                <div className='card-color-badge' style={{backgroundColor: `${this.props.color || 'gray'}`}}></div>
                <h1>{this.props.name}</h1>
                <div className="buyprice">Buy Price:&pound; {this.props.price||'N.A' }</div>
                <div className="rent">Rent:&pound;{this.props.rent || 'N.A'}</div>
            </div>
        );
    }
}
export default Card;