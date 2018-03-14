// songs from API in array
// have share button and play button
import React from 'react';
import MediaPlayer from './MediaPlayer';
import List from 'material-ui/List';

export default (props) => {
  // const {
  //   songs, // array
  // } = props;

  let songs = ["4822055", "20709703", "21087840", "21738649", "30234001", "54886621"];
  let songNames = ["I Will Survive", "A Thousand Miles", "Welcome to Jurassic Park", "Maybe It Was Memphis", "California Dreamin'"];
  return (
    <List id="stream-queue" className="scrollable">
      {songs.map((song, i) => (
        <MediaPlayer 
          key={i}
          songTitle={songNames[i]}
          songFile={song+".mp3"} 
          songId={song}
        />))}
    </List>
  );
};

