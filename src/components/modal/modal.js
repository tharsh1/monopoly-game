import React from 'react';
import cancel from '../../resources/cancel.svg'

import './modal.css'

class Modal extends React.Component{
    constructor(props){
        super(props);    
        this.state = {}
    }

    render(){
        console.log(this.props.show)
        return(
            <div className = {this.props.show ? 'back display-true': 'back display-hide'}>

            <div className = 'modal'>
                <img className='close' src={cancel} onClick={this.props.handleClose} alt=""/>
                {this.props.children}
            </div>
            </div>
        )
    }
}

export default Modal