import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardContent } from './Card';
import { uriSubDir } from '../Data/globalVars'

export default class SiteCard extends Component {

  render(){
    return (
      <div>
        <Card>
          <CardTitle text={this.props.data.name}></CardTitle>
          <CardContent text={'Site ID:'}>
            <p> {this.props.data.street} <br/>
            {this.props.data.city + ', ' + this.props.data.state + ' ' + this.props.data.zip}
            </p>
          </CardContent>
          <Link to={ uriSubDir + '/equip/'+ this.props.id }>
              <div className='card_buttons'>Equipment</div>
          </Link>
          <Link to='/addSite/'>
              <div className='card_buttons'>Add/Remove</div>
          </Link>
        </Card>
      </div>
    );
  }
}
