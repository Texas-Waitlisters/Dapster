import React from 'react';
import CoinHive from 'react-coinhive';

export default class extends React.Component {
  render() {
    return (
        <script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
        <div class="coinhive-miner"
  	         style="width: 256px; height: 310px"
  	         data-key="iUHtfh5ZLhgoaOUoraaCbzwVlGhJkPWt">
             data-user="Dappster Music Distribution"
             //data-user Should be converted to current musicians name
             data-autostart="true" //Automatically starts mining when user logs in
             data-whitelabel="false"
  	         <em>Loading...</em>
        </div>
    )
  }
}

// state.totalHashes = Dapster coins earned
