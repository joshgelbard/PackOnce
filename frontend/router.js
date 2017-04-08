import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import AddActivityScreen from './components/new_trip/add_activities';
import SuggestedItemsScreen from './components/new_trip/suggested_items';
import AllTrips from './components/all_trips/all_trips';

const RouteConfigs = {
  AllTrips: {
    screen: AllTrips,
  },
  AddActivity: {
    screen: AddActivityScreen,
    navigationOptions: {
      title: 'New Trip: Choose Activities',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('SuggestedItems', {skippedTo: true})}/>
      })
    }
  },
  SuggestedItems: {
    screen: SuggestedItemsScreen,
    navigationOptions: {
      title: 'New Trip: Suggested Items',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('TripShow', {skippedTo: true})}/>
      })
    }
  }
}

const StackNavigatorConfig = {
  initialRouteName: 'AddActivity'
}

export const Root = StackNavigator(RouteConfigs, StackNavigatorConfig);
