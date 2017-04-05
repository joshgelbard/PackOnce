import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import {
  AddActivity, AddDestination, SuggestedItems
} from './components/new_trip/new_trip';


export const NewTripStack = StackNavigator({
  AddActivity: {
    screen: AddActivity,
    navigationOptions: {
      title: 'New Trip step 1 of 3',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('AddDestination')}/>
      })
    }
  },
  AddDestination: {
    screen: AddDestination,
    navigationOptions: {
      title: 'New Trip step 2 of 3',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('SuggestedItems')}/>
      })
    }
  },
  SuggestedItems: {
    screen: SuggestedItems,
    navigationOptions: {
      title: 'New Trip step 3 of 3',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('TripShow')}/>
      })
    }
  }
});

export const Root = StackNavigator({
  NewTrip: {
    screen: NewTripStack
  }
}, {
  headerMode: 'none'
});
