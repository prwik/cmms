import React, { Component } from 'react';

class Card extends Component {

  render(){
    return (
      <div className='card'>
          {this.props.children}
      </div>
    );
  }
}


class CardTitle extends Component {

  render(){
    return (
      <div className='card_title'>
          {this.props.text}
      </div>
    );
  }
}

class CardContent extends Component {

  render(){
    return (
      <div className='card_content'>
          {this.props.text}
          {this.props.children}
      </div>
    );
  }
}

class CardButton extends Component {

  render(){
    return (
      <div className='card_button'>
          {this.props.text}
      </div>
    );
  }
}

export { Card, CardTitle, CardContent, CardButton }