import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const fakeTrip = {
  activities: ['camping', 'skiing', 'beach']
};

class NewTrip extends React.Component {
  render() {
    return (
      <Text>This is a newtrip</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default NewTrip;
