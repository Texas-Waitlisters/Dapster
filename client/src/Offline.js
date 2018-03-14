import React, {Component} from 'react'
import { RingLoader } from 'react-spinners';

export default class Offline extends Component{
	constructor(props){
		super(props)
		this.state = {
			loaded: true
		}
	}

	componentWillMount(){

	}

	render(){
		return(
			<div>
			
				<RingLoader
					color={'#123abc'}
					loading={this.state.loading}
				/>

				<p>Hi</p>

			</div>
		)
	}
}
