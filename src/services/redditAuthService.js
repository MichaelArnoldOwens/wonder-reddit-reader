import 'whatwg-fetch';
import { basic_auth, redirect_uri, redditTokenUri, state } from '../config';

export function getAuthCode() {
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
        return getAccessToken(codeOrError);
    } else {
      // Auth error
      return codeOrError;
    }
  }
}

function getAccessToken(code) {
  const get_access_token_uri = `${redditTokenUri}?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;

  return fetch(get_access_token_uri, {
    method: 'POST',
    headers: {
      'Authorization': basic_auth
    }
  }).then(response => response.json())
    .then(function(data) {
    console.log(data);
    const { access_token, refresh_token, error } = data;
    if(error) {
      return { error };
    }
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return { access_token, refresh_token };
  }).catch(err => {
    console.log(err)
    return err;
  });
}

// TODO: refactor getNewToken and getAccessToken
export function getNewAccessToken(refresh_token, apiCall = null) {
  console.log('getNewAccessToken() called')
  const get_refresh_token_uri = `${redditTokenUri}grant_type=refresh_token&refresh_token=${refresh_token}`
  fetch(get_refresh_token_uri, {
    method: 'POST',
    headers: {
      'Authorization': basic_auth
    }
  }).then(response => response.json())
    .then(function(data) {
    console.log(data);
    const { access_token, refresh_token, error } = data;
    if(error) {
      return { error };
    }
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    if(apiCall) {
      console.log('calling api call')
      return apiCall();
    }
    // TODO: clean this up; make it a flag instead of returning actual token (?)
    console.log('getNewAccessToken')
    console.log(access_token)
    return { access_token, refresh_token };
  }).catch(err => {
    console.log(err)
    return err;
  });
}

// TODO: store tokens in local storage
