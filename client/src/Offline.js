import React, {Component} from 'react'
import { RingLoader } from 'react-spinners';
import GridList from 'material-ui/GridList'
import GridTile from 'material-ui/GridList'
import './Offline.css'
var request = require("request")

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
			  url: 'http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/list_all_owned_items_with_grantees',
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
					return <GridTile key = {file[0]} class = 'tile'><center><h3><a href={"http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/decrypt_file?file="+file[0]}>{file[0]}</a></h3></center>
					<p>Permissions Granted To: {file[1]}</p>
					<form action="http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/give_perm" method="GET" target="dummyframe">
					Facebook ID: <input type="text" name="granted" />
					<input type = "hidden" name = "file" value = {file[0]} />
					<input type = "hidden" name = "owner" value = {localStorage.getItem('facebookID')} />
					<input type="submit" value="Submit" />
					</form>
					</GridTile>
				})
				grid = <GridList>{all_items}</GridList>
			}
		}

		return(
			<div>

			<h2>Welcome to the Distribution Center</h2>
			<h4>This is where you, as an artist, can distribute your content privately to other users</h4>
			<h4> Your ID is {localStorage.getItem('facebookID')}. Use this code to receive content</h4>
			<h4>Upload files here:</h4>
			<form action = "http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/encrypt_file" method = "POST"
			   enctype = "multipart/form-data" target = "dummyframe">
			   <input type = "file" name = "file" />
			   <input type = "hidden" name = "owner" value = {localStorage.getItem('facebookID')} />
			   <input type = "submit"/>
			</form>
			<br />
			<br />
			<center><RingLoader
			  color={'#123abc'}
			  loading={this.state.loading}
			/></center>
			{grid}



				<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>



			</div>
		)
	}
}
