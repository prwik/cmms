import React, { Component } from 'react';
import { FormShortText, FormLongText, FormCheckBox } from './FormTypes';
import { Card, CardTitle, CardContent, CardButton, CardFooter, CardFuncButton } from './Card';
import { Edit2 } from 'react-feather';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/';
    this.endpoint = 'check_lists'
    this.title = props.title;
    this.equipId = props.match.params.id;
    this.frequency = props.frequency;
    this.formType = 'value';

    this.state = {
      formStructure: [],
      isEditable: false,
      hasError: false,
      id: null
    }

    this.handleChange = this.handleChange.bind(this);
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

  editForm() {
    return(
      <Card>
        <CardTitle text={this.title} />
        <CardContent>
          <form className="form" onSubmit={this.handleSubmit}>
            <FormShortText title='Frequency' value={this.frequency} readOnly='true'/>
            { this.buildFormStructure() }
            { this.formError() }
            <div className="form_container"><input type="submit" text="Submit"/></div>
          </form>
        </CardContent>
      </Card>
    );
  }

  viewForm() {
    if(this.state.formStructure === null) {
      var formData = <div/>
    } else {
      var formData = this.state.formStructure.map((i, idx) => {
        return (
          <div key={idx}>
            <p>{i.name}: {i.value}</p>
          </div>
        )
      });
    }

    return(
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
    );



  }



  render() {
    if (this.state.isEditable) {
      return this.editForm();
    }
      return this.viewForm();
  }
}