import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Content />
      </div>
    );
  }
}

export default App;

class Navbar extends Component {
  render() {
    function click(){
      console.log('click');
    }
    return (
      <div className="navbar">
        <div className="menu_button" onClick={click}>
          <div className="menu_lines"></div>
          <div className="menu_lines"></div>
          <div className="menu_lines"></div>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return(
      <SiteCard name="Tesla"/>
    )
  }
}

class SiteCard extends Component {
  render(){
    return (
      <div className="card">
        {this.props.name}
      </div>
    );
  }
}
