import React, { Component } from 'react';
import '../Styles/FormBuilder.css';
import { Card, CardContent, CardFooter, CardFuncButton } from './Card';
import { Save, Edit2, PlusCircle, X } from 'react-feather';

export default class FormBuilder extends Component {
  constructor() {
    super();
    this.state = {
      numSteps: 1,
      steps:[]
    };

    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
  }

  componentDidMount() {
    this.setState({
      steps: [<Step key={1} stepNum={1} removeStep={this.removeStep}/>]
    });
  }

  addStep(){
    var steps = this.state.steps;
    const num = this.state.numSteps + 1;
    steps.push(<Step key={num} stepNum={num} removeStep={this.removeStep}/>);
    this.setState({steps: steps, numSteps: num}) ;
  }

  removeStep(i) {
    const steps = this.state.steps;
    var newSteps = []
    for(var t = 0; t < steps.length; t++) {
      if(steps[t].props.stepNum != i){
        newSteps.push(steps[t]);
      }
    }
    this.setState({steps: newSteps});
  }

  render() {
    return (
      <div>
        <div>
          {this.state.steps}
        </div>
        <div className='add-btn' onClick={this.addStep}>
          <PlusCircle color={'#9E9E9E'}/>
        </div>
      </div>
    );
  }
}

class Step extends Component {
  constructor() {
    super();
    this.state = {
      instruction: '',
      type: 'checkBox',
      canEdit: true
    };
    this.updateStep = this.updateStep.bind(this);
    this.saveStep = this.saveStep.bind(this);
    this.editStep = this.editStep.bind(this);
  }

  componentDidMount() {
    this.setState({instruction: this.props.text});
  }

  updateStep(event) {
    const value = event.target.value;
    const name = event.target.name;
    var currentState = this.state;
    currentState[name] = value;
    this.setState(currentState);
  }

  saveStep() {
    this.setState({canEdit: false});
  }

  editStep() {
    this.setState({canEdit: true});
  }

  render() {
    const inputType = {
      'checkBox': <input type="checkbox"/>,
      'text': <input type="text" />
    };

    var formCard;
    if(this.state.canEdit){
      formCard =
      <Card key={0}>
        <div className='form-card'>
          <div>
            <textarea
              rows="3"
              cols="35"
              id="test"
              placeholder="Enter step intructions"
              name="instruction"
              ref="instruction"
              onChange={this.updateStep}
              value={this.state.instruction}
            />
            <div className="spacer" />
            <div>Choose input type</div>
            <select name="type" onChange={this.updateStep} value={this.state.type}>
              <option value="checkBox">Check Box</option>
              <option value="text">Text</option>
            </select>
            <div className="spacer" />
          </div>
        </div>
        <CardFooter
          buttons={[
            <CardFuncButton
              key={0}
              icon={<Save size={18} />}
              text='Save'
              clickHandle={this.saveStep}
            />
          ]}
        />
      </Card>;
    } else {
      formCard =
      <Card key={0}>
        <div className='form-card'>
          <div>
            {this.state.instruction}
            <span className="hspacer" />
            {inputType[this.state.type]}
            <div className="spacer" />
          </div>
        </div>
        <CardFooter
          buttons={[
            <CardFuncButton
              key={0}
              icon={<Edit2 size={18} />}
              text='Edit'
              clickHandle={this.editStep}
            />,
            <CardFuncButton
              key={1}
              icon={<X size={18} />}
              text='Delete'
              clickHandle={()=> this.props.removeStep(this.props.stepNum)}
            />
          ]}
        />
      </Card>;;
    }
    return (
      formCard
    );
  }
}
