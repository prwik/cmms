import React, { Component } from 'react';
import { Card, CardTitle, CardContent } from './Card';

export default class LoginCard extends Component {
  render() {

    return (
      <Card>
      <CardTitle text={'Login'} />
      <CardContent text={'Please use the menu button to login.'} />
      </Card>
    );
  }
}