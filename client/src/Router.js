import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Logo from './Logo'
import Distribution from './Offline'

export default class DefaultRouter extends Component{
	render(){
		return(
			<Switch>
				<Route exact path = "/" component = {Logo}/>
				<Route exact path = "/stream" component = {Home}/>
				<Route exact path = "/distribute" component = {Distribution}/>
			</Switch>
		)
	}
}
