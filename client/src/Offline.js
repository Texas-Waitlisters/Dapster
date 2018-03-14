import React, {Component} from 'react'
import { RingLoader } from 'react-spinners';
import GridList from 'material-ui/GridList'
import GridTile from 'material-ui/GridList'
import './Offline.css'
var request = require("request")

export default class Distribution extends Component{
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			staged_files: []
		}
	}

	componentWillMount(){
		this.setState({})
		let cur_user = 	localStorage.getItem('facebookID')
		console.log(cur_user)
		if (cur_user != null){
			var options = { method: 'GET',
			  url: 'http://127.0.0.1:5000/list_all_owned_items',
			  qs: { owner: cur_user } };

			request(options, function (error, response, body) {
			  if (error) throw new Error(error);
			  this.setState({staged_files: JSON.parse(body)})
			  console.log(this.state.staged_files);
			  this.setState({loading: false})
		  }.bind(this));
		}
		else{
			this.setState({loading: false})
		}
	}
	render(){
		let all_items = null
		let grid = null
		if(!this.state.loading){
			if(this.state.staged_files.length == 0){
				grid = <h3>You have yet to add files! Upload files below.</h3>
			}
			else{
				all_items = this.state.staged_files.map((file) => {
					return <GridTile key = {file} class = 'tile'><center><h3><a href={"http://127.0.0.1:5000/decrypt_file?file="+file}>{file}</a></h3></center></GridTile>
				})
				grid = <GridList>{all_items}</GridList>
			}
		}

		return(
			<div>
			<center><RingLoader
			  color={'#123abc'}
			  loading={this.state.loading}
			/></center>
			<h2>Welcome to the Distribution Center</h2>
			<h4>This is where you, as an artist, can distribute your content privately to other users</h4>
			{grid}

			<h4>Upload files here:</h4>
			<form action = "http://127.0.0.1:5000/encrypt_file" method = "POST"
			   enctype = "multipart/form-data">
			   <input type = "file" name = "file" />
			   <input type = "hidden" name = "owner" value = {localStorage.getItem('facebookID')} />
			   <input type = "submit"/>
				</form>

			</div>
		)
	}
}
