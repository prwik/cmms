import React, { Component } from 'react';
import { Card, CardTitle, CardContent, CardFooter, CardLinkButton } from './Card';
import { Link } from 'react-router-dom';
import { uriSubDir } from '../Data/globalVars';
import { FileText } from 'react-feather';

export default class EquipmentCard extends Component {

  render(){
    return (
      <div>
        <Card>
          <CardTitle text={ this.props.serial } />
          <CardContent text={ this.props.name }>
            <CardContent text={ this.props.manufacturer } />
            <CardContent text={ this.props.description } />
          </CardContent>
          <CardFooter buttons={[
            <CardLinkButton
              icon={<FileText size={18}/>}
              link={uriSubDir + '/FormContent/' + this.props.id}
              text={'View CheckList'}
            />
          ]}/>
        </Card>
      </div>
    );
  }
}
