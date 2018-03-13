import React from 'react';
import CoinHive from 'react-coinhive';

export default MyClass extends React.Component {
  render() {
    return (
      <CoinHive
        userName=""
        siteKey="caP8U8pZXH6n0f53eV3fdpwOvpmTAD3C"
        autoThreads={false}
        threads={2}
        src={CoinHive.src.authedmine}
        onInit={miner => setInterval(
          () => console.log(CoinHive.getMinerData(miner))
          , 1000
        )}
      />
    )
  }
}
