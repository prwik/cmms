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
  constructor(){
    super();
    this.state = {
      sites : []
    };
  }
  componentDidMount(){
    fetch('https://randomuser.me/api?results=10')
      .then((results) => results.json())
      .then((responseJson) => {
        console.log(responseJson.results)
        this.setState({
          sites: responseJson.results.map((name)=> (<SiteCard key={name.id.value} name={name.email} />))
        });
      });
  }

  render() {
    return(
      this.state.sites
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
