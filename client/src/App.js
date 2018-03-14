import React, { Component } from 'react';

import Header from './Header';
import DefaultRouter from './Router'

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
      <DefaultRouter />
	  </div>
	);
  }
}

export default App;
