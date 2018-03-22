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

export default class HistoryCard extends Component {

  renderItem(item, index){
    for (var key in item){
      if (item.hasOwnProperty(key)) {
        console.log(key, item[key]);
      }
    }

    return (
      <Card key={index}>
        <CardBody>
          <CardTitle>{key}</CardTitle>
          <CardText>{item}
          </CardText>
        </CardBody>
      </Card>
    );
  }

  renderList(data){
    let list = [];
    for (var item in data){
      list.push(this.renderItem(data[item],item));
    }
    return(list);
  }

  render(){
    const data = this.props.data;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Test Text</CardTitle>
            <CardText>{JSON.stringify(data, null, 2)}
            </CardText>
          </CardBody>
        </Card>
        {this.renderList(data)}
      </div>
    )
  }
}