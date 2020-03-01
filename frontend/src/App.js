import React from 'react';

import { Switch, Route } from 'react-router-dom'

import Login from './components/login/login';
import Game from './components/game/game'




class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path ='/' component = {Game}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;
