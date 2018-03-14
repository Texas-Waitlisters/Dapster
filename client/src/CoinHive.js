import React from 'react';

export default class extends React.Component {
  render() {
		return (
			<div 
				className = "coinhive-miner"
				style = {{width: 160, height: 600, position: "fixed"}}
				data-key = "iUHtfh5ZLhgoaOUoraaCbzwVlGhJkPWt"
				data-user = "Dappster Music Distribution"
				// data-user Should be converted to current musicians name
				data-autostart = "true" //auto start
				data-whitelabel = "false"
				data-throttle = "" // blank = 100%
				data-threads = "4"
				//data-background = "#A9A9A9" //Dark grey
				data-background = "#ffffff"
				data-action = "0099cc" //Teal
				data-graph = "0099cc"
				data-text = "0099cc">
				<em>Mining...</em>
			</div>
		)
  }
}

// state.totalHashes = Dapster coins earned
