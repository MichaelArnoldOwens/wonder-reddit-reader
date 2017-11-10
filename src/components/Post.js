import React, { Component } from 'react';

export default class Feed extends Component {
  render() {
    const redditBaseLink = 'https://www.reddit.com';
    const { posts } = this.props;

    return posts ?
      posts.map(post => {
        const { id, title, url } = post.data;
        return (
          <div key={id}>
            <a href={url} target='_blank'><h4>{title}</h4></a>
          </div>
        );
      })
      : null;
  }
}
