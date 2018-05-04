import React, { Component } from 'react';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'endpoint'
    this.state = props.formStructure;
    this.title = props.title;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const formObject = {
      value: value,
      type: this.state[name].type
    }

    let new_state = this.state;
    new_state[name] = formObject;

    this.setState(new_state);
  }

  handleSubmit(event) {
    alert(JSON.stringify(this.state));
    event.preventDefault();

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    console.log(JSON.stringify(this.state));
  }

  buildFormStructure() {
    let inputs=[];
    let TagName;
    for (let key in this.state) {
      if (this.state[key].type === 'FormShortText') {
        TagName = FormShortText;
      }
      else if (this.state[key].type === 'FormLongText') {
        TagName = FormLongText;
      }
      else if (this.state[key].type === 'FormCheckBox') {
        TagName = FormCheckBox;
      }
      else {
        TagName = FormShortText;
      }
      inputs.push(
        <div key={key}>
          <TagName
            title={key}
            value={this.state[key].value}
            handleChange={this.handleChange}
           />
        </div>
      );
    }
    return inputs;
  }

  render() {
    return (
      <Card>
        <CardTitle text={this.title} />
          <CardContent>
            <form className="form" onSubmit={this.handleSubmit}>
              { this.buildFormStructure() }
              <div className="form_container"><input type="submit" text="Submit"/></div>
            </form>
          </CardContent>
      </Card>
    );
  }
}

function FormShortText(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <input type="text" name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}

function FormLongText(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <textarea name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}

function FormCheckBox(props) {
  return (
    <div className="form_container">
      <label htmlFor={props.title}>
        {props.title}
      </label>
      <input type="checkbox" name={props.title} id={props.title} value={props.value} onChange={props.handleChange} />
    </div>
  );
}