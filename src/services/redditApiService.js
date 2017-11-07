import 'whatwg-fetch';
import { redditBaseApiUri } from '../config';

export function getMyHome() {
  const token = localStorage.getItem('access_token');
  return fetch(redditBaseApiUri, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(response => {
    const { data, error } = response;
    if(error) {
      return { error };
    }
    return data.children.length ? data : getSubreddit('/r/news');
  }).catch(err => {
    console.log(err)
  });
}

export function getSubreddit(sub) {
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
