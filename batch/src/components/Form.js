import React, { Component } from 'react';
import { FormShortText, FormLongText, FormCheckBox } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'endpoint'
    this.title = props.title;

    this.state = {
      formStructure: props.formStructure,
      hasError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const formObject = {
      value: value,
      type: this.state.formStructure[name].type
    }

    let new_state = this.state.formStructure;
    new_state[name] = formObject;

    this.setState({ formStructure: new_state });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formStructure)
    }).catch((error) => { this.setState({ hasError:true })})
    console.log(JSON.stringify(this.state));
  }

  buildFormStructure() {
    let inputs=[];
    let TagName;
    for (let key in this.state.formStructure) {
      if (this.state.formStructure[key].type === 'FormShortText') {
        TagName = FormShortText;
      }
      else if (this.state.formStructure[key].type === 'FormLongText') {
        TagName = FormLongText;
      }
      else if (this.state.formStructure[key].type === 'FormCheckBox') {
        TagName = FormCheckBox;
      }
      else {
        TagName = FormShortText;
      }
      inputs.push(
        <div key={key}>
          <TagName
            title={key}
            value={this.state.formStructure[key].value}
            handleChange={this.handleChange}
           />
        </div>
      );
    }
    return inputs;
  }

  formError() {
    if(this.state.hasError) {
      return (
        <div className="form_container">Submit Error
        </div>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardTitle text={this.title} />
          <CardContent>
            <form className="form" onSubmit={this.handleSubmit}>
              { this.buildFormStructure() }
              { this.formError() }
              <div className="form_container"><input type="submit" text="Submit"/></div>
            </form>
          </CardContent>
      </Card>
    );
  }
}