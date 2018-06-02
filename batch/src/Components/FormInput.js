import React, { Component } from 'react';
import { FormShortText, FormLongText, FormCheckBox } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'endpoint'
    this.title = props.title;
    this.equipId = props.match.params.id;
    this.period = props.period;

    this.state = {
      formStructure: props.formStructure,
      isEditable: false,
      hasError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditable = this.handleEditable.bind(this);
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
        name: 'SME Inspection',
        value: '',
        type: 'FormCheckBox'
      }])
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.title,
      equipId: this.equipId,
      period: this.period,
      content: this.state.formStructure
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