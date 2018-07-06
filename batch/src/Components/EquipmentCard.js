import React, { Component } from 'react';
import { Card, CardTitle, CardContent } from './Card';
import { Link } from 'react-router-dom';
import { uriSubDir } from '../Data/globalVars'

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
          <Link to={ uriSubDir + '/form/' + this.props.id}>
            <div className="card_buttons">Check List</div>
          </Link>
          <Link to={ uriSubDir + '/FormContent/' + this.props.id}>
            <div className="card_button">New</div>
          </Link>
          <Link to='/'>
            <div className="card_buttons">New Entry</div>
          </Link>
        </Card>
      </div>
    );
  }
}
