import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch, Router } from 'react-router-dom';
import LoginCard from './LoginCard';
import Callback from './Callback';
import SettingsCard from './SettingsCard';
import history from '../history';

export default class Content extends Component {
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  render() {
    console.log(this.props.auth.isAuthenticated());
    return !this.props.auth.isAuthenticated() ? (
      <div>
        <Router history={history}>
          <div>
            <Route path="/callback" render={(props) => {
              this.handleAuthentication(props);
              return <Callback {...props}/>
            }} />
            <Route path='/' component={LoginCard} />
          </div>
        </Router>
      </div>
    )
    :
    (
      <div>
        <Router history={history}>
          <div>
            <Route exact path='/' component={Site} />
            <Route path='/equip/:id' component={Equipment} />
            <Route settings='/settings' component={SettingsCard} />
          </div>
        </Router>
      </div>
    )
  }
}