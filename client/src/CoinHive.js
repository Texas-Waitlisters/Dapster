import React from 'react';
import CoinHive from 'react-coinhive';
 
export default class extends React.Component {
  render() {
    return (
      <CoinHive
        userName="Maya" // username would be artists username so would go to their wallet associated with our website
        siteKey="caP8U8pZXH6n0f53eV3fdpwOvpmTAD3C"
        autoThreads={false}
        threads={2}
        src={CoinHive.src.authedmine}
        onInit={(miner) => setInterval(
          () => console.log(CoinHive.getMinerData(miner))
          , 1000
        )}
        onStop={() => {

        }}
      />
    )
  }
}

// state.totalHashes = Dapster coins earned