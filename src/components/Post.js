import React, { Component } from 'react';

export default class Feed extends Component {
  render() {
    const redditBaseLink = 'https://www.reddit.com';
    const { posts } = this.props;

    return posts ?
      posts.map(post => {
        return (
          <div>
            <h3>{post.data.title}</h3>
          </div>
        );
      }) 
      : null;

  }
}
