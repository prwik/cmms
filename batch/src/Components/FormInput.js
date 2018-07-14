import React, { Component } from 'react';
import { FormShortText, FormLongText, FormCheckBox } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';
import { Form } from './Form';

export default class FormInput extends Form {
  constructor(props) {
    super(props);
    this.formType = 'value';
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

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.title,
      equipId: this.equipId,
      period: this.period,
      formType: this.formType,
      data: this.state.formStructure
    }

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch((error) => { this.setState({ hasError: true })})
    if(!this.state.hasError){
      this.handleEditable()
    }
    console.log(JSON.stringify(data));
  }

  handleEditable() {
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  buildFormStructure() {
    let TagName;
    const inputs = this.state.formStructure.map( (item, idx) => {
      if (item.type === 'FormShortText') {
        TagName = FormShortText;
      }
      else if (item.type === 'FormLongText') {
        TagName = FormLongText;
      }
      else if (item.type === 'FormCheckBox') {
        TagName = FormCheckBox;
      }
      else {
        TagName = FormShortText;
      }
      return (
        <div key={idx}>
          <TagName
            title={item.name}
            value={item.value}
            handleChange={(e) => {this.handleChange(e, idx)}}
           />
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
    if (this.state.isEditable) {
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
    return (
      <Card>
        <CardTitle text={this.title} />
        <CardContent>
        {
          this.state.formStructure.map((i, idx) => {
            return (
              <div key={idx}>
              <p>{i.name}: {i.value}</p>
              </div>
            )
          })
        }
        <a onClick={this.handleEditable}>Edit</a>
        </CardContent>
      </Card>
    );
  }
}