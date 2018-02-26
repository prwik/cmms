import React, { Component } from 'react';
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
  constructor() {
    super();
    this.state = {
      display: <Sites />
    }
  }

  changeContent(contentType){
    if(contentType == 'sites') {
      this.setState({
        display: <Sites />
      });
    }
  }

  render() {
    return (this.state.display);
  }
}


class Sites extends Component {
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
          sites: responseJson.results.map((name)=> (<SiteCard
            key={name.login.username}
            name={name.email}
            city={name.location.city}
            state={name.location.state}
            regDate={name.registered}/>))
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
      <div className="site_card">
        <div className="card_title">
          {this.props.name}
        </div>
        <div className="card_content">
          City: {this.props.city} <br/>
          State: {this.props.state}
        </div>
        <div className="card_footer">
          {this.props.regDate}
        </div>
      </div>
    );
  }
}
