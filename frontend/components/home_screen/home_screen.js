import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
      <Image source={require('./background.jpg')}  style={styles.backgroundImage}>
        <Button
          buttonStyle={[styles.button, {backgroundColor: "#FB9483"}]}
          title="New Trip"
          icon={{name: 'add'}}
          onPress={ () => navigation.navigate('AddActivities')} />
        <Button
          buttonStyle={[styles.button, {backgroundColor: "#3DA57F"}]}
          title="Show Trip"
          icon={{name: 'slideshow'}}
          onPress={ () => navigation.navigate('ShowTrip')} />
        <Button
          buttonStyle={[styles.button, {backgroundColor: "#7865BE"}]}
          title="AllTrips"
          icon={{name: 'card-travel'}}
          onPress={ () => navigation.navigate('AllTrips')} />
        <Button
          buttonStyle={[styles.button, {backgroundColor: "#B21064"}]}
          title="Delete all trips"
          icon={{name: 'delete-forever'}}
          onPress={ () => deleteAllTrips() } />
        <Button
          buttonStyle={[styles.button, {backgroundColor: "#C0C63D"}]}
          title="Create test trip"
          onPress={ () => this.createTestTrip() }
        />
      </Image>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteAllTrips: () => dispatch(deleteAllTrips()),
  createTrip: trip => dispatch(createTrip(trip))
})

export default connect(null, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: 'stretch', // or 'stretch'
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    padding: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    display: "none"
  },
  newItemHidden: {
    display: "none"
  },
  newItemShow: {
    display: "flex"
  },
  button: {
    padding: 15,
    marginTop: 10,
    borderRadius: 50,
  }
});
