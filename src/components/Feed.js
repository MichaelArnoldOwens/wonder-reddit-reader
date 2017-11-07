import React, { Component } from 'react';
import { getMyHome } from '../services/redditApiService';

export default class Feed extends Component {
  
  render() {
    getMyHome().then(response => {
      console.log('getMyHome')
      console.log(response);
    });

    return (
      <div>FEED WILL BE HERE</div>
    );
  }
}
