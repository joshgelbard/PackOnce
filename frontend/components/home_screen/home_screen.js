import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';
import { deleteAllTrips, createTrip } from '../../actions/trip_actions'

class HomeScreen extends React.Component {

  createTestTrip() {
    const trip = {
      name: 'Created Trip',
      activities: ['Activities'],
      items: {
        0: { id: 0, name: 'ItemName', category: 'Category', checked: false }
      }
    }
    this.props.createTrip(trip)
  }

  render() {
    const { navigation, deleteAllTrips } = this.props
    return (
      <View>
        <Button title="New Trip"
          onPress={ () => navigation.navigate('AddActivity')} />
        <Button title="Show Trip"
          onPress={ () => navigation.navigate('ShowTrip')} />
        <Button title="AllTrips"
          onPress={ () => navigation.navigate('AllTrips')} />
        <Button title="Delete all trips"
          onPress={ () => deleteAllTrips() } />
        <Button title="Create test trip"
          onPress={ () => this.createTestTrip() }
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteAllTrips: () => dispatch(deleteAllTrips()),
  createTrip: trip => dispatch(createTrip(trip))
})

export default connect(null, mapDispatchToProps)(HomeScreen)
