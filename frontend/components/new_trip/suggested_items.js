import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, List, ListItem, Button, Icon } from 'react-native-elements';
import { saveTrip } from '../../actions/trip_actions';
import {
  receiveNewTripItem,
  getSuggestedItems
} from '../../actions/new_trip_actions';

const styles = StyleSheet.create({
  selected: {
    textDecorationLine: 'none',
    fontStyle: 'normal',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    paddingLeft: 0
  },
  unselected: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    paddingLeft: 50
  },
  container: {
    flex: 1,
    backgroundColor: "white"
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
  bigText: {
    fontSize: 24
  },
  smallText: {
    fontSize: 16
  },
  button: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#3DA57F",
    borderRadius: 50,
  },
  // items: {
  //
  // }
});

class SuggestedItemsScreen extends React.Component {

  componentWillMount() {
    this.props.getSuggestedItems(this.selectedActivities());
  }

  selectedActivities() {
    const { activities } = this.props;
    const selectedActivities = [];
    Object.keys(activities).forEach( key => {
      if (activities[key].selected) {
        selectedActivities.push(activities[key].name);
      }
    });
    return selectedActivities;
  }

  handleSubmit() {
    const selectedActivities = this.selectedActivities();
    const { activities, navigation, name, items, saveTrip } = this.props;
    const newItems = {}
    Object.keys(items).forEach( key => {
      if (items[key].selected) {
        newItems[key] = Object.assign({}, items[key], {checked: false});
      }
    });
    const trip = { name: name, activities: selectedActivities, items: newItems };
    this.props.saveTrip(trip)
      .then( () => navigation.navigate('ShowTrip'))
      .catch( () => navigation.navigate('ShowTrip'));
  }

  prompt() {
    return (
      <View>
        <Text style={styles.bigText}>
          Here are some suggested items.
        </Text>
        <Text style={styles.smallText}>
          You can choose which ones to keep.
        </Text>
      </View>
    );
  }

  makeListItem(item) {
    if (item.selected === undefined) {
      item.selected = true;
    }
    if (item.item.length === 0 ){
      item.item = 'unknown';
    }

    return (<ListItem
      title={item.item}
      titleStyle={ [styles.unselected, item.selected && styles.selected ] }
      hideChevron
      onPress={ () => this.handlePress(item) }
      leftIcon={ item.selected ? {name: 'highlight-off', style:{paddingLeft: 15,justifyContent: "center"}} : {} }
      key={item.id}
    />);
  }

  continueButton() {
    return (<Button
      buttonStyle={styles.button}
      title={"Continue"}
      onPress={() => this.handleSubmit()} />);
  }

  handlePress(item) {
    const newItem = Object.assign({}, item, { selected: !item.selected });
    this.props.receiveNewTripItem(newItem);
  }

  suggestedItemsList() {
    const listItems = Object.keys(this.props.items).map( (key) => {
      return this.makeListItem(this.props.items[key]);
    });
    return (
      <ScrollView>
        <List>
          { listItems }
        </List>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          { this.prompt() }
        </View>
        <View style={styles.bodyContainer}>
          { this.suggestedItemsList() }
        </View>
        <View style={styles.footerContainer}>
          { this.continueButton() }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.NewTrip.name,
  items: state.NewTrip.items,
  activities: state.NewTrip.activities
});

const mapDispatchToProps = (dispatch) => ({
  saveTrip: trip => dispatch(saveTrip(trip)),
  receiveNewTripItem: item => dispatch(receiveNewTripItem(item)),
  getSuggestedItems: selectedActivities => dispatch(getSuggestedItems(selectedActivities))
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedItemsScreen);
