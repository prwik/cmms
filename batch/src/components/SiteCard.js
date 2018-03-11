import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle,
  CardLink,
  Button } from 'reactstrap';

export default class SiteCard extends Component {
  render(){
    return (
      <div>
        <Card onClick={() => (this.props.onClick(this.props.equipdata))}>
          <CardHeader>{this.props.name}</CardHeader>
          <CardBody>
            <CardTitle className='cardtitle'>{this.props.shortdesc}</CardTitle>
            <CardSubtitle className='cardsubtitle'>{this.props.desc}</CardSubtitle>
            <Button>Edit</Button>
            <Button>Add/Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}