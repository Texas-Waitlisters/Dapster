import React from 'react';

export default (props) => {
  const renderUserProfile = () => {
    // localStorage.getItem('facebookID');
    // facebookAPI.getUser(facebookID)
    const totalCoins = Number(props.totalHashes) ? props.totalHashes * 50 : 500;
    return (
      <div>
        <h4> USER PROFILE </h4>
        <div>
          <h1> My name </h1>
          {/* <img src={facebookImg} */}
        </div>
        <h4> Dappster Coins Earned: {totalCoins} </h4> 
      </div>
    );
  }

  const renderArtistProfile = (artistID) => {
    // cloudinary.get(artistID)
    const totalCoins = Number(props.totalHashes) ? props.totalHashes * 200 : 2000;
    return (
      <div>
        <h4> ARTIST PROFILE </h4>
        {/* <StreamQueue songs={artistSongs} */}
        <h4> Total Dappsters earned: {totalCoins} </h4>
      </div>
    );
  }

  return (
    <div id="profile">
      {props.artistID ?
        renderArtistProfile(props.artistID) :
        renderUserProfile()}
    </div>
  );
}