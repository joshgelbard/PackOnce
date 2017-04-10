import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Text } from 'react-native';

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
  <Button
    buttonStyle={styles.logo}
    color="black"
    title={"PackOnce"} onPress={() => {
    if(state.routeName !== "HomeScreen"){
      navigate('HomeScreen');
    }
  }}/>);
};

const displayRightButton = (navigate, state) => {
  if(state.routeName === "SuggestedItems"){
    return(<Button title={"Skip"} onPress={() => navigate('TripShow', {skippedTo: true})}/>);
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
      right: displayRightButton(navigate, state)
    })
  }
};

export const Root = StackNavigator(RouteConfigs, StackNavigatorConfig);

const styles = {
  logo: {
    backgroundColor: 'transparent',
  },
};
