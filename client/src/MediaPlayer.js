// take code from api
// use cloudinary npm?
// song url? to stream? 

import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="media-player">
        <h4> {this.props.songTitle || "song title"} </h4>
        {/* embed cloudinary widget */}
        <p> ------------------------------------------------> </p>
        <p> play </p>
      </div>
    );
  }
}