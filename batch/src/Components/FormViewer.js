import React, { Component } from 'react';
import { CardEmpty, CardContent } from './Card';
import { Edit2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { uriSubDir } from '../Data/globalVars';
import '../Styles/FormViewer.css';

export default class FormViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      steps: []
    };

    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api';
    this.endpoint = this.endpoint = '/form_data?equipId=';
    this.equipId = props.match.params.id;
  }

  componentDidMount() {
    fetch(this.api + '/form_data?equipId=' + this.equipId)
      .then(response => response.json())
      .then(resJson => {
        const data = resJson[0].form_data;
        const id = resJson[0].equipId;
        console.log(resJson);
        var steps = []
        var num = 1
        const types = {
          'checkBox': <input type='checkbox' />,
          'text': <input type='text' />
        };
        var type;
        for(var key in data) {
          type = data[key].type;
          steps.push(
            <div className='step-row'>
              {num}.
              {data[key].instruction}
              <span className='hspacer'/>
              {types[type]}
            </div>
          );
          num ++;
        }
        this.setState({steps: steps, id: id});

      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <CardEmpty>
        <div className='form-content'>
          {this.state.steps}
        </div>
        <div className='buttons'>
          <Link key={0} to={uriSubDir + '/build_form/' + this.state.id }>
            <Edit2 key={1} size={18} color={'#8a8a8a'}/>
            Edit
          </Link>
        </div>
      </CardEmpty>
    )
  }
}
