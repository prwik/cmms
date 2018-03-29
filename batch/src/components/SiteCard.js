import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Card, CardTitle, CardContent, CardButton } from './Card';

export default class SiteCard extends Component {
  iterateObject(object){
    let list = '';
    for (let key in object){
      list += object[key] + ' ';
    }
    return list;
  }

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
          <Link to={ '/equip/'+ this.props.id }>
              <div className='card_button'>Equipment</div>
          </Link>
          <Link to='/'>
              <div className='card_button'>Add/Remove</div>
          </Link>
        </Card>
      </div>
    );
  }
}
