import React, { Component } from 'react';
import icon from './icon.png';
import './App.css';
import { redditInitAuthUri } from './config';
import { getBearerCode } from './services/redditAuthService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      refresh_token: null
    }
  }

  initAuthentication = () => {
    getBearerCode().then(response => {
      if(response.error) {
        this.setState({
          error: response.error
        });
      }
      this.setState({
        access_token: response.access_token,
        refresh_token: response.refresh_token
      });
    });
  }

  render() {
    const { access_token, error } = this.state;
    const isRedirect = window.location.href.split('?').length > 1;
    if(!access_token && isRedirect && !error) {
      this.initAuthentication();
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Wonder Reddit Reader</h1>
        </header>
        <p className="App-intro">
          { access_token ? null : (<a href={redditInitAuthUri} ><button>LOGIN</button></a>)}
        </p>
      </div>
    );
  }
}

export default App;
