import React, {Component} from 'react'
import { RingLoader } from 'react-spinners';
import GridList from 'material-ui/GridList'
import GridTile from 'material-ui/GridList'
import './Offline.css'
var request = require("request")

export default class Received extends Component{
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			staged_files: []
		}
	}



	render(){


		return(
			<div>

			<h2>Received files</h2>
			<h4> Your ID is {localStorage.getItem('facebookID')}. Use this code to receive content</h4>
			<br />
			<br />
			<center><RingLoader
			  color={'#123abc'}
			  loading={this.state.loading}
			/></center>


			</div>
		)
	}
}
