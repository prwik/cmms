import React, { Component } from 'react';
import '../Styles/CheckList.css'

export default class CheckList extends Component {
	constructor() {
	    super();
      this.state = {
        steps: [],
        currenStep: {
          instruction: '',
          label: '',
          type: ''
        }
      }
      this.genNewStep = this.genNewStep.bind(this);
      this.updateStep = this.updateStep.bind(this);
      this.removeStep = this.removeStep.bind(this);
	    this.api = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/test_equipment?id=';
	}

  genNewStep(){
    let steps = this.state.steps
    let stepNum = steps.length;
    let stepType = this.state.currenStep['type'];
    let currenStep = this.state.currenStep;
    currenStep['stepNum'] = stepNum;
    if(
      this.refs.instruction.value != '' &&
      this.refs.label.value != '' &&
      this.refs.stepType.value != 'pickOne'
    ) {

      steps.push(currenStep);
      this.setState({
        steps: steps,
        currenStep: {
            instruction: '',
            label: '',
            type: stepType,
          }
       });
      this.refs.instruction.value = '';
      this.refs.label.value = '';
    }

  }

  updateStep(event) {
    let key = event.target.name;
    var step = this.state.currenStep;
    step[key] = event.target.value;
    this.setState({currenStep: step});
  }

  removeStep(i){
    var steps = this.state.steps;
    steps.splice(i, 1);
    for(var t = 0; t < steps.length; t++) {
      steps[t].stepNum = t;
    }
    this.setState({
      steps: steps
    });
  }

	render(){
		return(
      <div>
        <div className="step-form">
          <textarea
            rows="3"
            cols="50"
            id="test"
            placeholder="Enter step intructions"
            name="instruction"
            ref="instruction"
            onChange={this.updateStep}
          />
          <div className="spacer"/>
          <input
            type="text"
            name="label"
            placeholder="Label"
            ref="label"
            onChange={this.updateStep}
           />
          <div className="spacer"/>
          Entry Type <br/>
          <select name="type" onChange={this.updateStep} ref="stepType">
            <option value="pickOne" default>Pick One</option>
            <option value="checkBox">Check Box</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className="spacer"/>
  			<div className="add-btn" onClick={this.genNewStep}>
  				Add Step
  			</div>
        <div className="spacer"/>
        <div className="spacer"/>
        <Steps steps={this.state.steps} remove={this.removeStep}/>
      </div>
		);
	}
}

class Steps extends Component {
  constructor(){
    super();
    this.submitData = this.submitData.bind(this);
  }
  submitData(){
    let url = 'http://ec2-34-217-104-207.us-west-2.compute.amazonaws.com/api/check_lists';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.props.steps),
      headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    }
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

  }

  render(){
      var steps = this.props.steps.map(step => (
          <Step
            key={step.stepNum}
            stepNum={step.stepNum + 1}
            instruction={step.instruction}
            label={step.label}
            stepType={step.type}
            remove={this.props.remove}
          />
        ));

      if(steps.length > 0 ){
          var submit = <div className="submit-btn" onClick={this.submitData}>Submit</div>;
      }

        return (
          <div>
            {steps}
            <div className="spacer"/>
            {submit}
          </div>
      );
    }
}

class Step extends Component {
  constructor() {
    super();
  }


  stepType = {
    'checkBox': <input type="checkbox"/>,
    'text': <input type="text"/>
  };



  render() {
    return(
      <table className="step-table">
        <tbody>
          <tr>
            <td>{this.props.stepNum}.</td>
            <td>{this.props.instruction}</td>
            <td>{this.props.label}</td>
            <td>{this.stepType[this.props.stepType]}</td>
            <td onClick={() => this.props.remove(this.props.stepNum - 1)}>
              <div className="remove-container">
              <div className="remove-inner">x</div>
            </div>
          </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
