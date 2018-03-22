import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch } from 'react-router-dom';

export default class Content extends Component {
  render() {
  	return (
  	<div>
  		<Switch>
  			<Route exact path='/' component={Site} />
  			<Route path='/equip/:id' component={Equipment} />
  		</Switch>
  	</div>
  	);
  }
}