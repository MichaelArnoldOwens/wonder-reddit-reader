import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import auth_uri from './config';

class App extends Component {
  login = () => {

  }
  render() {
    
    console.log(auth_uri);
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href={auth_uri} >CLICK HERE TO LOGIN</a>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
