import React, { Component } from 'react';
import { Card, CardTitle, CardContent, CardFooter, CardLinkButton } from './Card';
import { Link } from 'react-router-dom';
import { uriSubDir } from '../Data/globalVars';
import { FileText, CheckSquare } from 'react-feather';

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
              text={'Edit CheckList'}
            />,
            <CardLinkButton
              icon={<CheckSquare size={18}/>}
              link={uriSubDir + '/FormInput/' + this.props.id}
              text={'Fill Out CheckList'}
            />
          ]}/>
        </Card>
      </div>
    );
  }
}
