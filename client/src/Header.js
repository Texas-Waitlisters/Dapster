import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FacebookLogin from './FacebookLogin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';
import {Link} from 'react-router-dom'
export default class Header extends Component{
	constructor(props){
		super(props)
		this.state = {
			opened: false
		}
		this.handleHomeClick = this.handleHomeClick.bind(this)
	}

	handleHomeClick(){
		this.setState({open: false})
	}

	render(){
	  return (
		  <AppBar position="static">
				<Toolbar style={{display: "flex", justifyContent: "space-between"}}>

					<IconButton className="menuButton" color="inherit" aria-label="Menu">
						<MenuIcon onClick = {() => this.setState({open: !this.state.open})}/>
						<Drawer
							open={this.state.open}
							onRequestChange={(open) => this.setState({open})}
						>
							<Link to="/stream"><MenuItem onClick={() => this.setState({open: false})}>Listen</MenuItem></Link>
							<Link to="/"><MenuItem onClick={() => this.setState({open: false})}>Home</MenuItem></Link>
							<Link to="/distribute"><MenuItem onClick={() => this.setState({open: false})}>Distribution</MenuItem></Link>
							<Link to="/received"><MenuItem onClick={() => this.setState({open: false})}>Received Content</MenuItem></Link>

						</Drawer>
					</IconButton>

					<FacebookLogin />

				</Toolbar>
		  </AppBar>
	  );
	}
}
