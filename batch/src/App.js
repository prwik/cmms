import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
//import {comp_test_data} from './testdata';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Auth from './Auth/Auth';

export default class App extends Component {
  auth = new Auth();

  render() {
    return (
      <div>
        <Navigation auth={this.auth}/>
        <Content auth={this.auth}/>
      </div>
    );
  }
}
