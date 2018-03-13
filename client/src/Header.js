import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FacebookLogin from './FacebookLogin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';
import Menu from 'material-ui/Menu'
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
			<Toolbar>
			  <IconButton className="menuButton" color="inherit" aria-label="Menu">
				<MenuIcon onClick = {() => this.setState({open: !this.state.open})}/>
				<Drawer
				  docked={false}
				  width={200}
				  open={this.state.open}
				  onRequestChange={(open) => this.setState({open})}
				>
				  <MenuItem onClick={() => this.setState({open: false})}><Link to="/">Home</Link></MenuItem>
				  <MenuItem onClick={() => this.setState({open: false})}><Link to="/offline">Offline Downloads</Link></MenuItem>
				</Drawer>
				</IconButton>
			  <Typography variant="title" color="inherit">
				Dappster &nbsp; &nbsp;
			  </Typography>
			  <FacebookLogin />
			</Toolbar>
		  </AppBar>

	  );
	}
}
