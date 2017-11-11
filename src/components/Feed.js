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

  getFeed = () => {
    getMyHome().then(response => {
      if (response.error) {
        // TODO refactor this refresh token logic to be a reusable method
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          return getNewAccessToken(refresh_token).then(response => {
            this.getFeed();
          });
        }
      }
      this.setState({
        posts: response.children
      });
      return response;
    })
  }

  render() {
    const { posts } = this.state;
    const access_token = localStorage.getItem('access_token');
    if (!posts && access_token) {
      this.getFeed();
    }

    return (
      <div>
        <Post posts={posts} />
      </div>
    );
  }
}
