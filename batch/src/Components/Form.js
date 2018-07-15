import React, { Component } from 'react';
import { FormShortText, FormCheckBox, FormDropDown } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton } from './Card';


class Form extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'check_lists'
    this.title = props.title;
    this.equipId = props.match.params.id;
    this.period = props.period;
    this.inputTypes = ['FormShortText', 'FormLongText', 'FormCheckBox'];

    this.state = {
      formStructure: props.formStructure,
      isEditable: false,
      hasError: false,
      id: null
    }
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditable = this.handleEditable.bind(this);
  }

  /*** FormContent/FormValue ***/
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

  /*** FormContent ***/
  handleValueChange(e, idx) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let new_state = this.state.formStructure;

    const formObject = {
      type: this.state.formStructure[idx].type,
      name: value,
      value: this.state.formStructure[idx].value,
    }

    new_state[idx] = formObject;

    this.setState({ formStructure: new_state });
  }

  /*** FormContent ***/
  handleTypeChange(e, idx) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let new_state = this.state.formStructure;

    const formObject = {
      type: value,
      name: this.state.formStructure[idx].name,
      value: this.state.formStructure[idx].value,
    }

    new_state[idx] = formObject;

    this.setState({ formStructure: new_state });
  }

  /*** FormContent ***/
  handleAdd() {
    this.setState({
      formStructure: this.state.formStructure.concat([{
        name: '',
        value: '',
        type: 'FormShortText'
      }])
    });
  }

  /*** FormContent ***/
  handleRemove(idx) {
    this.setState({
      formStructure: this.state.formStructure.filter((s, sidx) => idx !== sidx)
    });
  }

  /*** FormContent/FormValue ***/
  handleEditable() {
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  /*** FormContent/FormValue ***/
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.title,
      equipId: this.equipId,
      period: this.period,
      formType: this.formType,
      form_data: this.state.formStructure
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

  /*** FormContent/FormValue ***/
    formError() {
    if(this.state.hasError) {
      return (
        <div className="form_container">Submit Error
        </div>
      );
    }
  }

  daysToFrequencyName(days){
    switch(days){
      case '7':
        return 'Weekly';
      case '30':
        return 'Monthly';
      case '90':
        return 'Quarterly';
      case '365':
        return 'Yearly';
      default:
        return days;
    }
  }
}

export { Form };	