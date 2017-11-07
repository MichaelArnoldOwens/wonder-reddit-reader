import React, { Component } from 'react';

export default class Feed extends Component {
  render() {
    const redditBaseLink = 'https://www.reddit.com';
    const { posts } = this.props;

    return posts ?
      posts.map(post => {
        const { id, title } = post.data;
        return (
          <div key={ id }>
            <h3>{ title }</h3>
          </div>
        );
      }) 
      : null;

  }
}
