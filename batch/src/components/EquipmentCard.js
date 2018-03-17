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

export default class EquipmentCard extends Component {

  render(){
    return (
      <div>
        <Card>
        <CardHeader>{ this.props.serial }</CardHeader>
          <CardBody>
            <CardTitle className='cardtitle'>{ this.props.name }</CardTitle>
            <CardSubtitle className='cardsubtitle'>{ this.props.manufacturer }</CardSubtitle>
            <CardText>{ this.props.description }</CardText>
            <Link to='/'>History</Link>
            <Link to='/'>New Entry</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}