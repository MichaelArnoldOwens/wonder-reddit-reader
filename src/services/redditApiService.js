import 'whatwg-fetch';
import { redditBaseApiUri } from '../config';


// TODO: add check that we have an access_token
// TODO: handle nextOrPrev for getting next slice of listings

export function getMyHome(nextOrPrev = null) {
  const token = localStorage.getItem('access_token');
  let url = redditBaseApiUri;
  /*
    1. if there's nextOrPrev
    2. is it next or prev?
  */
  if (nextOrPrev) {
    const { next, prev } = nextOrPrev
    if (next) {
      url = `${redditBaseApiUri}/?after=t3_${next}`;
    } else if (prev) {
      url = `${redditBaseApiUri}/?before=t3_${prev}`;
    }
  }


  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(response => {
    const { data, error } = response;
    if (error) {
      return { error };
    }
    return data.children.length ? data : getSubreddit('/r/news');
  }).catch(err => {
    console.log(err)
  });
}

export function getMySubreddits(nextOrPrev = null) {
  const token = localStorage.getItem('access_token');
  return fetch(redditBaseApiUri + '/subreddits/mine/subscriber', {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${token}`
    }
  }).then(response => {
    return response.json();
  });
}

export function getSubreddit(sub, nextOrPrev = null) {
  const token = localStorage.getItem('access_token');
  return fetch(redditBaseApiUri + sub, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(response => response.data);
}
