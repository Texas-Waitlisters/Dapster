// songs from API in array
// have share button and play button
import React from 'react';
import MediaPlayer from './MediaPlayer';

export default (props) => {
  // const {
  //   songs, // array
  // } = props;

  let songs = ["a", "a","a","a","a","a","a"];
  return (
    <div id="stream-queue">
      {songs.map((song, i) => <MediaPlayer key={i} song={song}/>)}
    </div>
  )
};

