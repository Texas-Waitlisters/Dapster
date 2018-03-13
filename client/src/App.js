import React, { Component } from 'react';

import FacebookLogin from './FacebookLogin';

import Header from './Header';
import StreamQueue from './StreamQueue';
import Profile from './Profile';

import CoinHive from './CoinHive';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: null,
      totalHashes: 0,
      songHashes: 0
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dapster</h1>
        </header>
        {/* if url=/profile add artis details */}
        <CoinHive />
        <div id="content-container">
          <StreamQueue />
          <Profile />
        </div>
        <FacebookLogin />
      </div>
    );
  }
}

export default App;
