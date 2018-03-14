import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Logo from './Logo'

export default class DefaultRouter extends Component{
	render(){
		return(
			<Switch>
				<Route exact path = "/" component = {Logo}/>
				<Route exact path = "/stream" component = {Home}/>
			</Switch>
		)
	}
}
