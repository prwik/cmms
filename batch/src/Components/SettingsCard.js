import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardTitle, CardContent, CardFooter } from './Card';

export default class SiteCard extends Component {
  render(){
    return (
      <div>
        <Card>
          <CardTitle text={'Settings'}></CardTitle>
          <CardContent text={'Settings will be here...'} />
            <CardFooter text={'Button Test'}>Test Button</CardFooter>
        </Card>
      </div>
    );
  }
}
