import React from 'react';
import { View, StyleSheet } from 'react-native';

export class NewTripStep extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { header, body, footer } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          { header }
        </View>
        <View style={styles.bodyContainer}>
          { body }
        </View>
        <View style={styles.footerContainer}>
          { footer }
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    height: 70,
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 1
  },
  selected: {
    backgroundColor: 'blue'
  },
  unselected: {
    backgroundColor: 'white'
  },
  bigText: {
    fontSize: 24
  },
  smallText: {
    fontSize: 16
  }
})
