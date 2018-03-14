import React from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';

export default ({songId}) => {
  const buySong = (songId) => (userId) => {
    if(userId && songId) {
      axios.post('api url', {userId, songId})
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