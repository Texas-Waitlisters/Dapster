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
			received: []
		}
	}

	componentWillMount(){
		this.setState({loading: true})
		let cur_user = 	localStorage.getItem('facebookID')
		if (cur_user != null){
			var options = { method: 'GET',
			  url: 'http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/list_sent_content',
			  qs: { user: cur_user }};

			request(options, function (error, response, body) {
			  if (error) throw new Error(error);

			  console.log(body);
			  this.setState({loading: false, received: JSON.parse(body)})
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
			if(this.state.received.length == 0){
				grid = <h3>You have not received any files!</h3>
			}
			else{
				all_items = this.state.received.map((file) => {
					return <GridTile key = {file[0]} class = 'tile'><div><center><h3><a href={"http://ec2-18-219-68-66.us-east-2.compute.amazonaws.com/decrypt_file?file="+file[0]}>{file[0]}</a></h3></center>
					<h4>Owner: {file[1]}</h4></div>
					</GridTile>
				})
				grid = <GridList>{all_items}</GridList>
			}
		}


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
			{grid}

			</div>
		)
	}
}
