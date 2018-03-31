import React, { Component } from 'react';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class Callback extends Component {
	render() {
		return (
			<Card>
				<CardTitle />
				<CardContent text={'Loading...'} />
			</Card>
		);
	}
}