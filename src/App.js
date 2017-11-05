import React, { Component } from 'react';
import icon from './icon.png';
import './App.css';
import auth_uri from './config';
import { retrieveToken } from './services/redditAuthService';

class App extends Component {

  render() {
    retrieveToken();
    return (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Wonder Reddit Reader</h1>
        </header>
        <p className="App-intro">
          <a href={auth_uri} >CLICK HERE TO LOGIN</a>
        </p>
      </div>
    );
  }
}

export default App;
