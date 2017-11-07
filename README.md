# __11/6/17 IN PROGRESS__ - Wonder Reddit Reader 2
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to Run
  1. `npm install`
  2. `npm run start`

## Things to Note
  > If the user doesn’t configure any subreddits, show posts from https://www.reddit.com/r/news/ by default.

I made the decision to show `/r/news` posts by default if the user's home page had no posts.

  >Write a server only if you think there is a functional reason for having one. Our feature requirements are front-end only. serve is a great way to serve static pages.

I wanted to make a note that without a server, the app is insecure because the app secret is exposed. Normally a server would handle the OAUTH calls and return an access token to the app.
