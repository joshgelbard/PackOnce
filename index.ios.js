import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './frontend/app.js';

export default class PackOnce extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('PackOnce', () => PackOnce);
