import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Card from 'material-ui/Card';
import CoinHive from './CoinHive';
import axios from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      profile: null
    }
  }

  renderUserProfile = () => {

    const totalCoins = Number(this.props.totalHashes) ? this.props.totalHashes * 50 : 500;
    return (
      <div>

        <h4>User Profile</h4>
        
        <div>
          <h1> {localStorage.getItem('username') || "Login to Facebook :P"} </h1>
          {localStorage.getItem('username') && 
          <img className="profile-pic" src={localStorage.getItem('profileImage')} />}
        </div>
        
        <h1> Dapster Coins Earned: {totalCoins} </h1> 
      
      </div>
    );
  }

  renderArtistProfile = (artistID) => {
    if(this.state.type === "artist") {
      const totalCoins = Number(this.props.totalHashes) ? this.props.totalHashes * 200 : 2000;
      const {releases} = this.state;
      return (
        <div>
          <h1> {releases[0].artist ? releases[0].artist.name : "Travis 'The Greatest' Laurendine"} </h1>
          
          <h4>Artist Profile</h4>            
          <h4> Total Dapsters earned: {totalCoins} </h4>

          <h4> Notable Releasess: {releases ? 
            releases.map((r) => `${r.type} - ${r.title}`) :
            "This artists has done too many amazing things to list"}
          </h4>

        </div>
      );
    } else {
      const artistProfile = axios
      .get(`https://evangelism.cloudinary.auth0-extend.com/sxsw-music-discovery-service/releases/${artistID}`)
      .then((data) => {
        const { releases: { release } } = data;
        this.setState({
          type: "artist",
          releases: release
        })
        console.log('release', release);
      })
      .catch((err) => {
        this.setState({
          type: "artist",
          releases: [{type: "StackOverflow", title: "This artists has done too many amazing things to list"}]
        });
      });
      console.log('art prof', artistProfile);
    }
  }

  render() {
    return (
      <Card id="profile">
        {this.props.artistID ?
          this.renderArtistProfile(this.props.artistID) :
          this.renderUserProfile()}
        <CoinHive />
      </Card>
    );
  }
}