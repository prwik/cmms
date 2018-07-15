import React, { Component } from 'react';
import { X } from 'react-feather';
import '../Styles/Modal.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='overlay' onClick={this.props.hideFunc}>
        <div className='pop-up'>
          {this.props.text}
        </div>
      </div>
    );
  }
}
