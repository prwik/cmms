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

export default class EquipmentCard extends Component {

  render(){
    let contacts = this.props.contacts.map((cont)=>(' ' + cont.firstname + ' ' + cont.lastname + ' ' + cont.phone))
    console.log(this.props.data.history)

    return (
      <div>
        <Card>
        <CardHeader>{this.props.name}</CardHeader>
          <CardBody>
            <CardImg className='image' top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardTitle className='cardtitle'>{this.props.shortdesc}</CardTitle>
            <CardSubtitle className='cardsubtitle'>Contacts:{contacts}</CardSubtitle>
            <CardText>{this.props.desc}</CardText>
            <CardLink href='#' onClick={() => (this.props.onClick(this.props.data))}>History</CardLink>
            <CardLink href='#'>New Entry</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}