import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './frontend/store'
import { Root } from './frontend/router';

const store = configureStore()

export default class PackOnce extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PackOnce', () => PackOnce);
