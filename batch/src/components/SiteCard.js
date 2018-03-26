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
          <CardContent text={this.props.data.street}>
            <CardContent text={this.props.data.city} />
            <CardContent text={this.props.data.state} />
            <CardContent text={this.props.data.zip} />
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
