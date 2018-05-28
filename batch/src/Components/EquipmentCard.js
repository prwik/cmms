import React, { Component } from 'react';
import { Card, CardTitle, CardContent } from './Card';
import { Link } from 'react-router-dom';

export default class EquipmentCard extends Component {

  render(){
    return (
      <div>
        <Card>
          <CardTitle text={ this.props.serial } />
          <CardContent text={ this.props.name }>
            <CardContent text={ this.props.manufacturer } />
            <CardContent text={ this.props.description } />
          </CardContent>
          <Link to='/'>
            <div className="card_button">History</div>
          </Link>
          <Link to='/'>
            <div className="card_button">New</div>
          </Link>
        </Card>
      </div>
    );
  }
}