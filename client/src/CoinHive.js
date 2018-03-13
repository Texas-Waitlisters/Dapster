import React from 'react';
import CoinHive from 'react-coinhive';

export default class extends React.Component {
  render() {
    return (
        <script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
        <div class="coinhive-miner"
  	         style="width: 256px; height: 310px"
  	         data-key="iUHtfh5ZLhgoaOUoraaCbzwVlGhJkPWt">
  	         <em>Loading...</em>
        </div>
    )
  }
}

// state.totalHashes = Dapster coins earned
