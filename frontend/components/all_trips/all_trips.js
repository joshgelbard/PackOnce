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
    backgroundColor: "white",
  },
  title: {
    fontSize: 40,
    padding: 15,
    // marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    backgroundColor: '#43c696',
  },
  items1: {
    backgroundColor: 'white',
  },
  items2: {
    backgroundColor: '#64a8e0',
  },
  itemColor: {
    color: 'white',
  },
  itemColor1: {
    color: 'black',
  },
  itemColor2: {
    color: 'white',
  },
});


class AllTrips extends React.Component {
  constructor(props){
    super(props);
    this.switchColor = 0;
  }

  handlePress(tripId){
    this.props.loadTrip(tripId)
      .then( () => this.props.navigation.navigate('ShowTrip'));
  }

  componentWillMount(){
    this.props.getAllTrips();
  }

  makeListItem(trip) {
    let style;
    let itemColor;

    if (this.switchColor === 0)
      {style = allTripStyles.items;
      itemColor = allTripStyles.itemColor;}
    else if (this.switchColor === 2)
      {style = allTripStyles.items2;
      itemColor = allTripStyles.itemColor2;}
    else
      {style = allTripStyles.items1;
      itemColor = allTripStyles.itemColor1;}

    this.switchColor = (this.switchColor + 1) % 4;

    return (<ListItem
      titleStyle={itemColor}
      containerStyle={style}
      title={trip.name}
      onPress={ () => this.handlePress(trip.id) }
      underlayColor={ '#FFB405' }
      key={trip.id}
    />);
  }

  render(){
    const listItems = Object.keys(this.props.trips).map( (id) => {
      return this.makeListItem(this.props.trips[id]);
    });
    return (
      <ScrollView style={allTripStyles.container}>
        <Text style={allTripStyles.title}>All Trips</Text>
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
