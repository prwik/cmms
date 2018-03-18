import React, { Component } from 'react';
import SiteCard from './SiteCard';

export default class Equipment extends Component {
	constructor(props){
		super(props);
		this.state = {
			sites: null,
		}
	}
	componentDidMount(){
	    fetch('https://randomuser.me/api?results=10')
	      .then((results) => results.json())
	      .then((responseJson) => {
	        //console.log(responseJson.results);
	        this.setState({
	          sites: responseJson.results.map((data,index)=> (<SiteCard key={index} name={data.email} id={index} data={data}/>)),
	        });
	    });
	}

	render(){
		return (
			<div>
			{this.state.sites}
			</div>
		);
	}
}