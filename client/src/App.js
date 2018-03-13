import React, { Component } from 'react';

import FacebookLogin from './FacebookLogin';
import CoinHive from './CoinHive';

import Header from './Header';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dappster</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FacebookLogin />
        {/* <CoinHive /> */}
      </div>
    );
  }
}

export default App;
