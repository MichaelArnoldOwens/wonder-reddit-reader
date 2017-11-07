import React, { Component } from 'react';
import Post from './Post';
import { getMyHome } from '../services/redditApiService';
import { getNewAccessToken } from '../services/redditAuthService';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: false
    };
  }
  render() {
    const { posts } = this.state;
    if(!posts) {
      console.log('no posts')
      console.log(posts);
    }
    if(!posts) {
      getMyHome().then(response => {
        console.log('getMyHome')
        console.log(response);
        // TODO: verify whether this works or not
        if(response.error) {
          // refresh token
          const refresh_token = localStorage.getItem('refresh_token');
          return getNewAccessToken(refresh_token, getMyHome);
        }
        this.setState({
          posts: response.data.children
        });
        return response;
      });
    }

    return (
      <div>
        <Post posts={ posts } />
      </div>
    );
  }
}
