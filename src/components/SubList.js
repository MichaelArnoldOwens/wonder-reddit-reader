import React, { Component } from 'react';
import { getMySubreddits } from '../services/redditApiService';
import { getNewAccessToken } from '../services/redditAuthService';

export default class SubList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subs: null
    }
  }

  getSubList = () => {
    getMySubreddits().then(response => {
      if(response.error) {
        // get new token
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          return getNewAccessToken(refresh_token).then(response => {
            this.getSubList();
          });
        }
      }
      const subreddits = response.data.children.map(subredditObj => {
        const { id, url } = subredditObj.data;
        return (
          <div key={id}>
            <strong>{url}</strong>
          </div>
        );
      });
      this.setState({subs: subreddits});
    });
  }

  render() {
    const { subs } = this.state;
    const token = localStorage.getItem('access_token');
    if(!subs && token) {
      this.getSubList();
    }

    return (
      <div>
        SUBLIST
        { subs }
        SUBLIST END
      </div>
    );
  }
}