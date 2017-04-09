import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { CheckBox, Icon, Button, List, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { getAllTrips, loadTrip } from '../../actions/trip_actions'

const allTripStyles = StyleSheet.create({
  selected: {
    backgroundColor: 'blue'
  },
  unselected: {
    backgroundColor: 'white'
  }
});


class AllTrips extends React.Component {
  constructor(props){
    super(props);
  }

  handlePress(tripId){
    this.props.loadTrip(tripId)
      .then( () => this.props.navigation.navigate('ShowTrip'))
  }

  componentWillMount(){
    console.log('mounting');
    this.props.getAllTrips();
  }

  makeListItem(trip) {
    return (<ListItem
      containerStyle={ [allTripStyles.unselected, trip.selected && allTripStyles.selected] }
      title={trip.name}
      onPress={ () => this.handlePress(trip.id) }
      underlayColor={ 'blue' }
      key={trip.id}
    />);
  }

  render(){
    const listItems = Object.keys(this.props.trips).map( (id) => {
      return this.makeListItem(this.props.trips[id]);
    });
    return (
      <ScrollView>
        <List>
          { listItems }
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.AllTrips
});

const mapDispatchToProps = (dispatch) => ({
  getAllTrips: () => dispatch(getAllTrips()),
  loadTrip: tripId => dispatch(loadTrip(tripId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTrips);
