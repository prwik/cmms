import React, { Component } from 'react';
import { Card, CardTitle, CardContent } from './Card';

export default class Callback extends Component {
	render() {
		return (
			<Card>
				<CardTitle />
				<CardContent text={'Loading...'}/>
			</Card>
		);
	}
}