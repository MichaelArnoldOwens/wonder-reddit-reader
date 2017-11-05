import 'whatwg-fetch';
import { basic_auth, client_id, redirect_uri, state } from '../config';

export function retrieveToken() {
  // http://127.0.0.1:3000/authorize_callback?state=wonder-reddit-app&code=FexgaqpKHMs-1w8eQ_8O_RXYjUg

  let params = window.location.href.split('?');

  // Parse the query params
  if(params.length > 1) {
    params = params[1].split('&');
    let paramState = params[0];
    let codeOrError = params[1];
    paramState = paramState.substring(paramState.indexOf('=') + 1);
    const sameState = state === paramState;

    if(sameState && (codeOrError.indexOf('code') !== -1)) {
        codeOrError = codeOrError.substring(codeOrError.indexOf('=') + 1);
        console.log(codeOrError);
        return getAccessToken(codeOrError);
    } else {
      // Auth error
      console.log(codeOrError)
    }
  }
}

function getAccessToken(code) {
  const access_token_uri = `https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;

  return fetch(access_token_uri, {
    method: 'POST',
    headers: {
      'Authorization': basic_auth
    }
  }).then(response => response.json())
    .then(function(data) {
    console.log(data);
    const { access_token, refresh_token } = data;
    return { access_token, refresh_token };
  }).catch(err => {
    console.log(err)
  });
}

// TODO: store tokens in local storage
