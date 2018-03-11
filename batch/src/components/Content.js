import React, { Component } from 'react';

export default class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      sites : [],
      click: 0,
      view: null,
    };
    this.handleClick = this.props.onClick;
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
      if (this.props.view) {
        return (this.props.view);
      }
      else {
        return (this.props.sites);
      }
  }
}