import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch } from 'react-router-dom';
import LoginCard from './LoginCard'

export default class Content extends Component {
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  render() {
  	return (
  	<div>
  		<Switch>
        {
          !this.props.auth.isAuthenticated() && (
              <Route exact path='/' component={LoginCard} />
          )
        }
        {
          this.props.auth.isAuthenticated() && (
            <div>
              <Route exact path='/' component={Site} />
              <Route path='/equip/:id' component={Equipment} />
            </div>
          )
        }
        <Route path="/callback" render={(props) => {
          this.handleAuthentication(props);
          return <Site/> 
        }}/>
  		</Switch>
  	</div>
  	);
  }
}