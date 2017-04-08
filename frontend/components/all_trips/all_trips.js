import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet, AsyncStorage } from 'react-native';
import { CheckBox, Icon, Button, List, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { getTrip, createTrip } from '../../actions/trip_actions'

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

  handlePress(trip){
    getTrip(trip.id)
  }

  makeListItem(trip) {
    return (<ListItem
      containerStyle={ [allTripStyles.unselected, trip.selected && allTripStyles.selected] }
      title={trip.name}
      onPress={ () => this.handlePress(trip) }
      underlayColor={ 'blue' }
      key={trip.id}
    />);
  }

  render(){
    const listItems = Object.keys(this.props.trips).map( (id) => {
      return this.makeListItem(this.props.trips[id]);
    });
    return (
      <View>
        <List>
          {listItems}
        </List>
        <Button onPress={() => this.saveSomeTrip()} title="SaveSomeTrip"/>
        <Button onPress={() => this.listAllData()} title="List all keys" />
      </View>
    );
  }
}

// export default AllTrips;


const mapStateToProps = (state) => ({
  trips: state.AllTrips
});

const mapDispatchToProps = (dispatch) => ({
  // receiveActivity: activity => dispatch(receiveActivity(activity)),
  // getSuggestedItems: selectedActivities => dispatch(getSuggestedItems(selectedActivities))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTrips);
