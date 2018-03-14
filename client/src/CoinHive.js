import React from 'react';

export default class extends React.Component {
  render() {
		return (
			<div 
				className = "coinhive-miner"
				style = {{width: "50%", height: "50%", position: "fixed"}}
				data-key = "iUHtfh5ZLhgoaOUoraaCbzwVlGhJkPWt"
				data-user = "Dapster Music Distribution"
				// data-user Should be converted to current musicians name
				data-autostart = "true" //auto start
				data-whitelabel = "false"
				data-throttle = "" // blank = 100%
				data-threads = "4"
				//data-background = "#A9A9A9" //Dark grey
				data-background = "#ffffff"
				data-action = "9D47A8" //Teal
				data-graph = "9D47A8"
				data-text = "9D47A8">
				<em>Mining...</em>
			</div>
		)
  }
}

// state.totalHashes = Dapster coins earned
