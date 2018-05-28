import React, { Component } from 'react';
import { FormShortText, FormCheckBox, FormDropDown } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class CheckList extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'endpoint'
    this.title = props.title;
    this.equipID = props.equipID;
    this.inputTypes = ['FormShortText', 'FormLongText', 'FormCheckBox'];

    this.state = {
      equipID: this.equipID,
      formStructure: props.formStructure,
      hasError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, idx) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const formObject = {
      name: name,
      value: value,
      type: this.state.formStructure[idx].type
    }

    let new_state = this.state.formStructure;
    new_state[idx] = formObject;

    this.setState({ formStructure: new_state });
  }

  handleRemove(idx) {
    this.setState({
      formStructure: this.state.formStructure.filter((s, sidx) => idx !== sidx)
    });
  }

  handleAdd() {
    this.setState({
      formStructure: this.state.formStructure.concat([{
        name: 'New Item',
        value: 'new_item',
        type: 'FormCheckBox'
      }])
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).catch((error) => { this.setState({ hasError: true })})
    console.log(JSON.stringify(this.state));
  }

  buildFormStructure() {
    let TagName;
    const inputs = this.state.formStructure.map((item, idx) => {
      return (
        <div key={idx}>
          <FormShortText
            title='Input Name'
            value={item.name}
            handleChange={(e) => {this.handleChange(e, idx)}}
          />
          <FormDropDown
            title={'Input Type'}
            value={item.type}
            optionArray={this.inputTypes}
            handleChange={(e) => {this.handleChange(e, idx)}}
          />
          <a onClick={() => {this.handleRemove(idx)}}>remove</a>
        </div>
      );
    });
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
              <a onClick={() => {this.handleAdd()}}>add</a>
              { this.formError() }
              <div className="form_container"><input type="submit" text="Submit"/></div>
            </form>
          </CardContent>
      </Card>
    );
  }
}