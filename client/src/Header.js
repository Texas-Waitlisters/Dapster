import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FacebookLogin from './FacebookLogin';


export default (props) =>  {

  return (

	  <AppBar position="static">
		<Toolbar>
		  <IconButton className="menuButton" color="inherit" aria-label="Menu">
			<MenuIcon />
		  </IconButton>
		  <Typography variant="title" color="inherit">
			Dappster &nbsp; &nbsp;
		  </Typography>
		  <FacebookLogin />
		</Toolbar>
	  </AppBar>

  );
}
