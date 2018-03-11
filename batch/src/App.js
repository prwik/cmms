import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {comp_test_data} from './testdata';
import HistoryCard from './components/HistoryCard';
import EquipmentCard from './components/EquipmentCard';
import Navigation from './components/Navigation';
import SiteCard from './components/SiteCard';
import Content from './components/Content';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: null,
      sites: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if (comp_test_data) {
      this.setState({sites: comp_test_data.map((site,index)=> (
        <SiteCard key={index} name={site.name} shortdesc={site.shortdesc} desc={site.desc} equipdata={site.equipment} onClick={this.handleClick}/>)),
    });
    }
    else {
    fetch('https://randomuser.me/api?results=10')
      .then((results) => results.json())
      .then((responseJson) => {
        console.log(responseJson.results)
        this.setState({
          sites: responseJson.results.map((name,index)=> (<SiteCard key={index} name={name.email} equipdata={name.location} onClick={this.handleClick}/>)),
        });
      });
    }
  }

  handleClick(equipment) {
    if (equipment === null) {
      this.setState({view: null});
    }
    else if (equipment.history) {
      this.setState({
        view: <HistoryCard data={equipment.history} />
      });
    //Add condition for incorrect data. i.e. no equip history
    }
    else {
      this.setState({
        view: equipment.map((equip,index)=> (<EquipmentCard key={index} name={equip.name} shortdesc={equip.shortdesc} desc={equip.desc} contacts={equip.contacts} data={equip} onClick={this.handleClick}/>))
      });
    }
  }

  render() {
    return (
      <div>
        <Navigation handleClick={this.handleClick}/>
        <Content onClick={this.handleClick} view={this.state.view} sites={this.state.sites}/>
      </div>
    );
  }
}