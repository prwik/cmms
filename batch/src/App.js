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
      display: <Sites route={this.changeContent.bind(this)}/>
    };
  }

  changeContent(contentType) {
    if(contentType === 'sites') {
      this.setState({
        display: <Sites route={this.changeContent.bind(this)}/>
      });
    }
    else if(contentType === 'equipment') {
      this.setState({
        display: "Equipment page"
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
            regDate={name.registered}
            route={this.props.route}/>))
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
      <div className="site_card" onClick={() => {this.props.route('equipment')}}>
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
