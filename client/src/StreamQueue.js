// songs from API in array
// have share button and play button
import React from 'react';
import MediaPlayer from './MediaPlayer';
import List from 'material-ui/List';

export default (props) => {
  // const {
  //   songs, // array
  // } = props;

  let songs = ["a"];
  
  // const songPlayer = new APPlayer({
    // container: document.getElementById('stream-queue')
  //   options,
  //   configs,
  //   audio: [
  //     hard coded songs
  //   ]
  // });


  return (
    <List id="stream-queue" className="scrollable">
      {songs.map((song, i) => (
        <MediaPlayer 
          key={i}
          songTitle={song}
          songFile={song} // replace these
          songId={song}
        />))}
    </List>
  );
};

