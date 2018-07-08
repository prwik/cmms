import React, { Component } from 'react';
import { FormShortText, FormLongText, FormCheckBox, FormDropDown } from './FormTypes';
import { Card, CardTitle, CardContent, CardFooter, CardFuncButton } from './Card';
import { Edit2 } from 'react-feather';

export default class FormContent extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'check_lists'
    this.title = props.title;
    this.equipId = props.match.params.id;
    this.frequency = props.frequency;
    this.formType = 'template';
    this.inputTypes = ['FormShortText', 'FormLongText', 'FormCheckBox'];

    this.state = {
      formStructure: [],
      isEditable: false,
      hasError: false,
      id: null
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditable = this.handleEditable.bind(this);
  }

  componentDidMount() {
    fetch(this.api + '/form_data?equipId=' + this.equipId)
      .then((results) => results.json())
      .then((resJson) => {
        if(resJson.length > 0) {
          this.setState({
            id: resJson[0].id,
            formStructure: resJson[0].form_data
          });
      }
      });
  }

  handleValueChange(e, idx) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let new_state = this.state.formStructure;

    const formObject = {
      name: value,
      value: this.state.formStructure[idx].value,
      type: this.state.formStructure[idx].type
    }

    new_state[idx] = formObject;

    this.setState({ formStructure: new_state });
  }

  handleTypeChange(e, idx) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let new_state = this.state.formStructure;

    const formObject = {
      name: this.state.formStructure[idx].name,
      value: this.state.formStructure[idx].value,
      type: value
    }

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
        name: '',
        value: '',
        type: 'FormShortText'
      }])
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.id === null){
      var id = 'none';
    } else {
      var id = this.state.id;
    }

    const data = {
      title: this.title,
      equipmentId: this.equipId,
      frequency: this.frequency,
      formType: this.formType,
      data: this.state.formStructure,
      id: id
    }

    fetch(this.api + this.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((resJson) => {
      this.setState({
        id: resJson.id
      });
    })
    .catch((error) => { this.setState({ hasError: true })})
    this.handleEditable();
  }

  handleEditable() {
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  buildFormStructure() {
    if(this.state.formStructure !== null) {
      var inputs = this.state.formStructure.map((item, idx) => {
        return (
          <Card key={idx}>
            <CardContent>
              <div>
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
                <a onClick={() => {this.handleRemove(idx)}}>Remove Field</a>
              </div>
            </CardContent>
          </Card>
        );
      });
    } else {
      var inputs = '';
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

  editForm() {
    return (
      <Card>
        <CardTitle text={this.title} />
        <CardContent>
          <form className="form" onSubmit={this.handleSubmit}>
            <FormShortText title='Frequency' value={this.frequency} readOnly='true'/>
            { this.buildFormStructure() }
            <a className="form_container" onClick={() => {this.handleAdd()}}>Add Field</a>
            { this.formError() }
            <div className="form_container"><input type="submit" text="Submit"/></div>
          </form>
        </CardContent>
      </Card>
    )
  }

  viewForm(formData) {
    function typeConversion(i){
      if (i.type === 'FormShortText') {
        return <FormShortText title={i.name} readOnly='true'/>
      }
      else if (i.type === 'FormLongText') {
        return <FormLongText title={i.name} readOnly='true'/>
      }
      else if (i.type === 'FormCheckBox') {
        return <FormCheckBox title={i.name} readOnly='true'/>
      }
    }

    if(this.state.formStructure === null) {
      var formData = <div/>
    } else {
      var formData = this.state.formStructure.map((i, idx) => {
        return (
          <div key={idx}>
            {typeConversion(i)}
          </div>
        )
      });
    }

    return (
      <Card>
        <CardTitle text={this.title} />
        <CardContent>
          <FormShortText title='Frequency' value={this.frequency} readOnly='true'/>
          {formData}
        </CardContent>
        <CardFooter buttons={
          <CardFuncButton
            text='Edit'
            clickHandle={this.handleEditable}
            icon={<Edit2 size={18}/>}
          />
        }/>
      </Card>
    )    
  }

  render() {
    if (this.state.isEditable || this.state.hasError) {
      return this.editForm();
    }
      return this.viewForm();
  }
}