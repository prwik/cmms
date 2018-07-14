import React, { Component } from 'react';
import { FormShortText, FormCheckBox, FormDropDown } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';
import { Form } from './Form';

export default class FormContent extends Form {
  constructor(props) {
    super(props);
    this.formType = 'template';
  }

  componentDidMount() {
    fetch(this.api + '/form_data?equipId=' + this.equipId)
      .then((results) => results.json())
      .then((data) => {
        this.setState({
          id: data.id,
          formStructure: data.form_data
        });
    });
  }

  buildFormStructure() {
    const inputs = this.state.formStructure.map((item, idx) => {
      return (
        <div key={idx}>
          <FormShortText
            title='Input Name'
            value={item.name}
            handleChange={(e) => {this.handleValueChange(e, idx)}}
          />
          <FormDropDown
            title={'Input Type'}
            value={item.type}
            optionArray={this.inputTypes}
            handleChange={(e) => {this.handleTypeChange(e, idx)}}
          />
          <a className='form_container' onClick={() => {this.handleRemove(idx)}}>Remove Field</a>
        </div>
      );
    });
    return inputs;
  }

  render() {
    if (this.state.isEditable || this.state.hasError) {
      return (
        <Card>
          <CardTitle text={this.title} />
          <CardContent>
            <form className="form" onSubmit={this.handleSubmit}>
              { this.buildFormStructure() }
              <a className="form_container" onClick={() => {this.handleAdd()}}>Add Field</a>
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
              <p>{i.name}: {i.type}</p>
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
