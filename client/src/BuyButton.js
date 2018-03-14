import React from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';

export default ({songId}) => {
  const buySong = (songId) => (facebookId) => {
    if(facebookId && songId) {
      axios.post(
        'http://localhost:3001/api/buy/',
        {facebookId, songId, artist: "Dapster"}
      )
        .then((results) => {
          
        })
        .catch((error) => {

        });
    }
  }
  const userId = localStorage.getItem("facebookId");
  return (
    <div className="buy-button">
      <Button
        className="buy-button"
        variant="raised"
        color="primary"
        onClick={() => buySong(songId)(userId)}
      >
        Buy Song      
      </Button>
    </div>
  );
}