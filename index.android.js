import React from 'react';
import { AppRegistry } from 'react-native';
import App from './frontend/components/App';

export default class PackOnce extends React.Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('PackOnce', () => PackOnce);
