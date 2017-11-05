import 'whatwg-fetch';
import { client_id, state } from '../config';

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
      console.log('AUTH ERROR')
    }
  }
}
// grant_type=authorization_code&code=CODE&redirect_uri=URI

function getAccessToken(code) {
  // https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000/authorize_callback&code=7lrQR9pjNFfkr5cdQSlMvv6A_Is


  let access_token_uri = `https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=${code}&redirect_uri=http://127.0.0.1:3000/authorize_callback`;
  console.log('cors')
  return fetch(access_token_uri, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': 'Basic NERaUlBxMFd1WGlEaGc6bk4xemxkYTl2d0o5RTgtUFlJelRxYTNNUkNZ'
      // 'Access-Control-Allow-Headers': '*',
      // 'Access-Control-Allow-Origin': 'localhost'
      // 'Access-Control-Allow-Methods': '*'
    }
  }).then(response => {
    
    return response.json();
  }).then(function(data) {
    // `data` is the parsed version of the JSON returned from the above endpoint.
    console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
  }).catch(err => {
    console.log(err)
  });
}