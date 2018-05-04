import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch } from 'react-router-dom';
import LoginCard from './LoginCard';
import Form from './Form';
import Callback from './Callback';
import SettingsCard from './SettingsCard';

export default class Content extends Component {
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  formData = {
    '3mo Checkup': {
      value: '',
      type: 'FormCheckBox'
    },
    '6mo Checkup': {
      value: '',
      type: 'FormShortText'
    },
    '12mo Checkup': {
      value: '',
      type: 'FormShortText'
    }
  };

  formTitle = 'Form Title';

  render() {
  	return (
  	<div>
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
                return <Form title={this.formTitle} formStructure={this.formData} />
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