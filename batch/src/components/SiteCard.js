import React, { Component } from 'react';
import {
  Card,
  //CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle,
  //CardLink,
  //Button 
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
          <CardHeader>{ this.props.name }</CardHeader>
          <CardBody>
            <CardTitle className='cardtitle'></CardTitle>
            <CardSubtitle className='cardsubtitle'></CardSubtitle>
            <CardText>{this.iterateObject(this.props.data.location)}</CardText>
            <Link className='button' to={ '/equip/'+ this.props.id }>Equipment</Link>
            <Link className='button' to='/'>Add/Remove</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}