// take code from api
// use cloudinary npm?
// song url? to stream? 

import React, {Component} from 'react';
// import MediaPlayer from 'react-audioplayer';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
  }
  
  toggleMusic() {
    // logic to toggle play owhen play button pressed
  }

  buyMusic() {
    // post to api with FB ID and songID
  }

  render() {
    return (
      <div className="media-player">
        
        <div>
          <h4> {this.props.songTitle || "song title"} </h4>
        </div>
        
        <div>
          {/* <MediaPlayer src={this.props.songFile}/> */}
          <p> ------------------------------------------------> </p>
        </div>
        
        <div onClick={this.toggleMusic}>
          <p> play </p>
        </div>
      
        <div onClick={this.buySong}>
          <p> buy </p>
        </div>

      </div>
    );
  }
}