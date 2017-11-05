// export const client_id = encodeURIComponent('KZ8Nj91o7-KK0Q');
export const client_id = encodeURIComponent('4DZRPq0WuXiDhg');
const redirect_uri = encodeURIComponent('http://127.0.0.1:3000/authorize_callback');
const scope = encodeURIComponent('mysubreddits subscribe');

export const state = encodeURIComponent('wonder-reddit-app');
export default `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=${scope}`;
