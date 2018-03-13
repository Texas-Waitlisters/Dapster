import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class extends Component {
  render() {
    return (
        <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        onClick={(a) => (a)}
        callback={(a) => (a)} />
    );
  }
}


// add FB Pixel
// show demo that listens most, avg spending er age, social group,
// can see os so which listeners have best hash power, who to market people to