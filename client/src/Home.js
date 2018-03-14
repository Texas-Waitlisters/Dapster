import React, {Component} from 'react'
import FacebookLogin from './FacebookLogin';

import logo from './logo.svg';
import './App.css';
import StreamQueue from './StreamQueue';
import Profile from './Profile';

import CoinHive from './CoinHive';

export default class Home extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
			currentSong: null,
			totalHashes: 0,
			songHashes: 0
	  }
	}

	render(){
		return(
			<div>
				
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Dapster</h1>
				</header>
				
				<CoinHive />

				<div id="content-container">
					<StreamQueue />
					<Profile />
				</div>
		
			</div>
		)
	}
}
