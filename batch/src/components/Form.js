import React, { Component } from 'react';
import { Card, CardTitle, CardContent } from './Card';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  value1: '',
                  value2: '',

    };
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/test_sites';
    this.endpoint = 'endpoint'
    this.formStructure = props.formStructure;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.value)
    })
    console.log(JSON.stringify(this.state.value));
  }

  render() {
    return (
      <Card>
        <CardTitle text="Input Form" />
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <FormShortText title='text input ' value={this.state.value1} handleChange={this.handleChange} />
            <br />
            <FormLongText title='text box ' value={this.state.value2} handleChange={this.handleChange} />
            <br/>
            <FormSelect title='select' value={['A', 'B', 'C']} />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </CardContent>
      </Card>
    );
  }
}

function FormShortText(props) {
  return (
    <label>
      {props.title}
      <input type="text" value={props.value} onChange={props.handleChange} />
    </label>
  );
}

function FormLongText(props) {
  return (
    <label>
      {props.title}
      <textarea value={props.value} onChange={props.handleChange} />
    </label>
  );
}

function FormSelect(props) {
  return (
    <label>
    {props.title}
    <select multiple={true} value={props.value}/>
    </label>
  );
}