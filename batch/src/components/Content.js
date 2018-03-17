import React, { Component } from 'react';
import Site from './Site';
import Equipment from './Equipment';
import { Route, Switch } from 'react-router-dom';

export default class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      sites : [],
      click: 0,
      view: null,
    };
    this.handleClick = this.props.onClick;
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
  	return (
  	<div>
  		<Switch>
  			<Route exact path='/' component={Site} />
  			<Route path='/equip/:id' component={Equipment} />
  		</Switch>
  	</div>
  	);
  	/*
      if (this.props.view) {
        return (this.props.view);
      }
      else {
        return (this.props.sites);
      }
     */
  }
}