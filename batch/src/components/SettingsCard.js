import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class SiteCard extends Component {
  render(){
    return (
      <div>
        <Card>
          <CardTitle text={'Settings'}></CardTitle>
          <CardContent text={'Settings will be here...'} />
            <CardButton text={'Button Test'}>Test Button</CardButton>
        </Card>
      </div>
    );
  }
}
