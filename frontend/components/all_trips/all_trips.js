import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { CheckBox, Icon, Button, List, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { getAllTrips, loadTrip } from '../../actions/trip_actions';

const allTripStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  items: {
    backgroundColor: '#3DA57F',
  },
  items1: {
    backgroundColor: 'white',
  },
  items2: {
    backgroundColor: 'steelblue',
  },
});


class AllTrips extends React.Component {
  constructor(props){
    super(props);
    this.switchColor = 0;
  }

  handlePress(tripId){
    this.props.loadTrip(tripId)
      .then( () => this.props.navigation.navigate('ShowTrip'))
  }

  componentWillMount(){
    this.props.getAllTrips()
  }

  makeListItem(trip) {
    let style;

    if (this.switchColor === 0)
      {style = allTripStyles.items;}
    else if (this.switchColor === 2)
      {style = allTripStyles.items2;}
    else
      {style = allTripStyles.items1;}

    this.switchColor = (this.switchColor + 1) % 4;

    return (<ListItem
      containerStyle={style}
      title={trip.name}
      onPress={ () => this.handlePress(trip.id) }
      underlayColor={ 'steelblue' }
      key={trip.id}
    />);
  }

  render(){
    const listItems = Object.keys(this.props.trips).map( (id) => {
      return this.makeListItem(this.props.trips[id]);
    });
    return (
      <ScrollView style={allTripStyles.container}>
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
