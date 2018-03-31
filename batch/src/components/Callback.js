import React, { Component } from 'react';
//import history from '../history';
import { Card, CardTitle, CardContent } from './Card';

export default class Callback extends Component {
	constructor(){
		super();
		this.state = {
			authenticated: false
		}
	}
	componentDidMount(){
		this.setState({authenticated: this.props.auth.isAuthenticated()});
	}
	render() {
		return (
			<Card>
				<CardTitle />
				<CardContent text={'Loading... Logged in: ' + this.state.authenticated} />
			</Card>
		);
	}
}