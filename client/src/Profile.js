import React from 'react';

export default (props) => {
  const renderUserProfile = () => {
    // localStorage.getItem('facebookID');
    // facebookAPI.getUser(facebookID)
    return (
      <div>
        <h4> USER PROFILE </h4>
        <div>
          <h1> My name </h1>
          {/* <img src={facebookImg} */}
        </div>
        <h4> Dappster Coins Earned: {props.totalHashes * 50} </h4> 
      </div>
    );
  }

  const renderArtistProfile = (artistID) => {
    // cloudinary.get(artistID)
    return (
      <div>
        <h4> ARTIST PROFILE </h4>
        {/* <StreamQueue songs={artistSongs} */}
        <h4> Total Dappsters earned: {props.totalHashes * 200} </h4>
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