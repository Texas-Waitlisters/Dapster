import React, {Component} from 'react'
import FacebookLogin from './FacebookLogin';

import StreamQueue from './StreamQueue';
import Profile from './Profile';
import Logo from './Logo';

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
				
				<Logo height={"25vh"}/>

				<div id="content-container">
					<StreamQueue />
					<Profile />
				</div>
		
			</div>
		)
	}
}
