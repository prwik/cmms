import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
//import {comp_test_data} from './testdata';
import NavBar from './Components/NavBar';
import Content from './Components/Content';
import Auth from './Auth/Auth';

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Content />
      </div>
    );
  }
}
