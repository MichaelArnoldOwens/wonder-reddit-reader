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
    // const data = response.json();
    // console.log(data);
    // return data ? data : getSubreddit('/r/news');
    return response.json();
  }).then(response => {
    console.log(response)
    const data = response.data;
    return data.children.length ? data : getSubreddit('/r/news');
  });
}

export function getSubreddit(sub) {
  const token = localStorage.getItem('access_token');
  console.log(redditBaseApiUri + sub)
  return fetch(redditBaseApiUri + sub, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${token}`
    }
  }).then(response => {
    console.log(`getSubreddit ${sub}`)
    console.log(response)
    return response.json();
  });
}
