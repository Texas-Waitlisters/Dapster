import React from 'react';
import CoinHive from 'react-coinhive';

export default class extends React.Component {
  render() {
    return (
        <script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
        <div class = "coinhive-miner"
  	         style = "width: 256px; height: 310px"
  	         data-key = "iUHtfh5ZLhgoaOUoraaCbzwVlGhJkPWt">
             data-user = "Dappster Music Distribution"
             //data-user Should be converted to current musicians name
             data-autostart = "true" //Automatically starts mining when user logs in
             data-whitelabel = "false"
             data-throttle = ".5" //50 percent thread utilization
             data-threads = "3"
             data-background = "#D3D3D3" //Grey
             data-action="008080" //Teal
             >
  	         <em>Mining...</em>
        </div>
    )
  }
}

// state.totalHashes = Dapster coins earned
