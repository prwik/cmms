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

  render(){
    return (
      <div>
        <Card>
          <CardHeader>{this.props.name}</CardHeader>
          <CardBody>
            <CardTitle className='cardtitle'></CardTitle>
            <CardSubtitle className='cardsubtitle'></CardSubtitle>
            <CardText>Test Text</CardText>
            <Link to={'/equip/'+ this.props.id}>Equipment</Link>
            <Link to='/'>Add/Remove</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}