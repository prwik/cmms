import React, { Component } from 'react';
import EquipmentCard from './EquipmentCard';

/*
import { 
	BrowserRouter, 
	Route, 
	Link, 
	Switch 
} from 'react-router-dom';
*/

export default class Equipment extends Component {
	constructor() {
	    super();
	    this.state = {
	      cards: null,
	      api: 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/test?id='
	    };
	}

	componentDidMount(){
	    fetch( this.state.api + this.props.match.params.id)
	      .then((results) => results.json())
	      .then((responseJson) => {
	        //console.log(responseJson);
	        this.setState({
	        	cards: responseJson.map((value,key)=>(<EquipmentCard key={key} serial={value.serial_number} manufacturer={value.manufacturer} name={value.name} description={value.description} />))
	        });
	    });
	}

	render(){
		return(
			<div>
				{this.state.cards}
			</div>
		);
	}
}