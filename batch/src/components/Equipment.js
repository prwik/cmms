import React, { Component } from 'react';
import EquipmentCard from './EquipmentCard';

export default class Equipment extends Component {
	constructor() {
	    super();
	    this.state = {
	      equipment: null
	    };
	    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/test_equipment?id=';
	}

	componentDidMount(){
	    fetch(this.api + this.props.match.params.id)
	      .then((results) => results.json())
	      .then((responseJson) => {
	        console.log(responseJson);
	        this.setState({
	        	equipment: responseJson.map((value,key)=>(<EquipmentCard key={key} serial={value.serial_number} manufacturer={value.manufacturer} name={value.name} description={value.description} />))
	        });
	    });
	}

	render(){
		return(
			<div>
				{this.state.equipment}
			</div>
		);
	}
}
