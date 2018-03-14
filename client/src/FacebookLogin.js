import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class extends Component {
  onLogin = (data) => {
    if(data.accessToken) {
      localStorage.setItem('facebookToken', data.accessToken);
      localStorage.setItem('facebookID', data.id);
      localStorage.setItem('profileImage', data.picture.data.url);
      localStorage.setItem('username', data.name);
    }
  };

  render() {
	return (
	  <FacebookLogin
		icon="fa-facebook"
		backgroundColor="#3f51b5"
		appId="157181544931223"
		autoLoad={true}
		fields="name,email,picture"
		onClick={(a) => (a)}
		callback={this.onLogin} />
	);
  }
}


// add FB Pixel
// show demo that listens most, avg spending er age, social group,
// can see os so which listeners have best hash power, who to market people to
