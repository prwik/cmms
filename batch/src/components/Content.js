import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
//import { Route, Switch, Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoginCard from './LoginCard';
import Callback from './Callback';
import SettingsCard from './SettingsCard';
//import history from '../history';

export default class Content extends Component {
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  render() {
<<<<<<< HEAD
  	return (
  	<div>
  		<Switch>
  			<Route exact path='/' component={Site} />
            <Route path='/login/' component={Auth} />
  			<Route path='/equip/:id' component={Equipment} />
            <Route path='/addSite/' component={SiteForm} />
  		</Switch>
  	</div>
  	);
=======
    console.log(this.props.auth.isAuthenticated());
    return !this.props.auth.isAuthenticated() ? (
      <div>
        <Route exact path='/' component={LoginCard} />
        <Route path="/callback" render={(props) => {
          this.handleAuthentication(props);
          return <Callback {...this.props}/>
        }} />
      </div>
    )
    :
    (
      <div>
        <Route exact path='/' component={Site} />
        <Route path='/equip/:id' component={Equipment} />
        <Route path='/settings' component={SettingsCard} />
        <Route path='/callback' render={() => {
          return <Callback {...this.props} />
        }} />
      </div>
    )
>>>>>>> eb0196bd11f029ec889b8eb4fb20962ef093407a
  }
}
