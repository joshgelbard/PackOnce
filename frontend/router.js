import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { View, Text, Image, TouchableHighlight } from 'react-native';

import AddActivitiesScreen from './components/new_trip/add_activities';
import SuggestedItemsScreen from './components/new_trip/suggested_items';
import AllTrips from './components/all_trips/all_trips';
import TripShow from './components/trip_show/trip_show';
import HomeScreen from './components/home_screen/home_screen';

const RouteConfigs = {
  HomeScreen: {
    screen: HomeScreen
  },
  AllTrips: {
    screen: AllTrips

  },
  ShowTrip: {
    screen: TripShow,
  },
  AddActivities: {
    screen: AddActivitiesScreen,
  },
  SuggestedItems: {
    screen: SuggestedItemsScreen,
  }
};

const displayTitle = (navigate, state) => {
  return(
    <TouchableHighlight
      style={styles.touch}
      onPress={() => {
      if(state.routeName !== "HomeScreen"){
        navigate('HomeScreen');
      }}}>
        <Image
          style={styles.logo}
          source={require('./logo.png')}
           />
    </TouchableHighlight>
  );
};

const displayRightButton = (navigate, state) => {
  if(state.routeName === "SuggestedItems"){
    return(<Button title={"Skip"} onPress={() => navigate('ShowTrip', {skippedTo: true})}/>);
  }
  else if(state.routeName === "AddActivities") {
    return(<Button title={"Skip"} onPress={() => navigate('SuggestedItems', {skippedTo: true})}/>);
  }
};


const StackNavigatorConfig = {
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    header: ({ navigate, state }) => ({
      title: displayTitle(navigate, state),
      right: displayRightButton(navigate, state),
      style: styles.header
    })
  }
};

export const Root = StackNavigator(RouteConfigs, StackNavigatorConfig);

const styles = {
  touch: {
    flex:1,
  },
  logo: {
    backgroundColor: 'transparent',
    height: 40,
    width: 100,
    marginLeft: 10,
    marginTop: 5,
  },
  header: {
    backgroundColor: "#2A2B2A"
  }
};
