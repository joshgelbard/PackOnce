import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Button } from 'react-native-elements'

import { AddActivityScreen } from './components/new_trip/add_activities'

export const Root = StackNavigator({
  AddActivity: {
    screen: AddActivityScreen,
    navigationOptions: {
      title: 'New Trip step 1 of 3',
      header: ({ navigate }) => ({
        right: <Button title={"Skip"} onPress={() => navigate('SuggestedItems')}/>
      })
    }
  }
});
