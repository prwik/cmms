import React, { Component } from 'react';
import '../Styles/Card.css';
import { Link } from 'react-router-dom';

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

class CardFooter extends Component {

  render(){
    return (
      <div className='card_footer'>
        {this.props.buttons}
        {this.props.children}
      </div>
    );
  }
}

class CardLinkButton extends Component {

  render(){
    return (
        <Link className='card_btn' to={ this.props.link}>
          {this.props.icon}
          <span className='spacer'></span>
          {this.props.text}
        </Link>
    );
  }
}

class CardFuncButton extends Component {

  render(){
    return (
        <span className='card_btn' onClick={ this.props.clickHandle}>
          {this.props.icon}
          <span className='spacer'></span>
          {this.props.text}
        </span>
    );
  }
}


export { Card, CardTitle, CardContent, CardFooter, CardLinkButton, CardFuncButton }
