import React, { Component } from 'react';
import { getMySubreddits } from '../services/redditApiService';

export default class SubList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subs: null
    }
  }

  getSubList = () => {
    getMySubreddits().then(response => {
      const subreddits = response.map(subredditObj => {
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
    if(!subs) {
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