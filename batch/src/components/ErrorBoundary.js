import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
 constructor(){
 	super();
 	this.state = {
 		hasError: false
 	}
 }
 componentDidCatch(error, info) {
 	this.setState({ hasError: true })
 	//sendToErrorReportingService(error,info);
 }
 render() {
 	if(this.state.hasError) {
 		return <div>Something went terribly wrong!</div>
 	} else {
 		return this.props.children;
 	}
 }
}