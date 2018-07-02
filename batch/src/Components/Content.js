import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch } from 'react-router-dom';
import LoginCard from './LoginCard';
import Form from './Form';
import CheckList from './CheckList';
import Callback from './Callback';
import SettingsCard from './SettingsCard';
import { formData, formTitle } from '../Data/FormData';

export default class Content extends Component {
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  render() {
  	return (
  	<div className="body-content">
  		<Switch>
        {
          !this.props.auth.isAuthenticated() && (
            <div>
              <Route path='/' component={LoginCard} />
              <Route path="/callback" render={(props) => {
                this.handleAuthentication(props);
                return <Callback {...this.props} />
              }} />
            </div>
          )
        }
        {
          this.props.auth.isAuthenticated() && (
            <div>
              <Route exact path='/' component={Site} />
              <Route path='/equip/:id' component={Equipment} />
              <Route path='/form' render={ () => {
                return <CheckList title={formTitle} formStructure={formData} />
              }} />
              <Route path='/settings' component={SettingsCard} />
            </div>
          )
        }
      </Switch>
    </div>
    )
  }
}
