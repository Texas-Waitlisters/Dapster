import React, {Component} from 'react'
import { RingLoader } from 'react-spinners';

export default (props) => (
	<div
		id="landing-page"
		style={{
			height: props.height || "100vh",
			width: props.width || "auto",
			alignItems: "center",
			justifyContent:  "center",
		}}
	/>
)