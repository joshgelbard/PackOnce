import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, List, ListItem, Button, Icon } from 'react-native-elements'
import { NewTripStep, newTripStyles } from './new_trip'
import { receiveTrip, receiveItem } from '../../actions/trip_actions'

const _list = ['1234', '2345', '3456', '4567', 'a1234', 'a2345', 'a3456', 'x4567', '12j34', ]

const suggestedItemsStyles = StyleSheet.create({
  selected: {
    textDecorationLine: 'none',
    fontStyle: 'normal'
  },
  unselected: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: 'gray'
  }
})

class SuggestedItems extends React.Component {
  constructor(props) {
    super(props)
  }

  makeListItem(item) {
    return <ListItem
      title={item.name}
      titleStyle={ [suggestedItemsStyles.unselected, item.selected && suggestedItemsStyles.selected ] }
      hideChevron
      onPress={ () => this.handlePress(item) }
      leftIcon={ item.selected ? {name: 'highlight-off'} : {} }
      key={item.id}
    />
  }

  handlePress(item) {
    const newItem = Object.assign({}, item, { selected: !item.selected })
    this.props.receiveItem(newItem)
  }

  render() {
    const listItems = Object.keys(this.props.items).map( (key) => {
      return this.makeListItem(this.props.items[key])
    })
    return (
      <ScrollView>
        <List>
          { listItems }
        </List>
      </ScrollView>
    )
  }
}
class SuggestedItemsScreen extends React.Component {
  handleSubmit() {
    const selectedActivities = []
    Object.keys(this.props.activities).forEach( key => {
      if (this.props.activities[key].selected) {
        selectedActivities.push(this.props.activities[key].name)
      }
    })
    const items = Object.assign({}, this.props.items)
    Object.keys(items).forEach( key => {
      items[key].checked = false
    })
    const trip = { name: this.props.name, activities: selectedActivities, items }
    this.props.createTrip(trip)
      .then( () => this.props.navigation.navigate('TripShow'))
      .catch( () => this.props.navigation.navigate('TripShow'))
  }

  render() {
    const { items, activities, createTrip, receiveItem } = this.props

    const continueButton = (
      <Button title={"Continue"} onPress={() => this.handleSubmit()} />
    )

    const prompt = (
      <View>
        <Text style={newTripStyles.bigText}>
          Here are some suggested items
        </Text>
        <Text style={newTripStyles.smallText}>
          You can choose which ones to keep.
        </Text>
      </View>
    )

    const suggestedItems = <SuggestedItems
      items={items}
      activities={activities}
      createTrip={createTrip}
      receiveItem={receiveItem}
    />

    return <NewTripStep header={prompt} body={suggestedItems} footer={continueButton} />
  }
}

const mapStateToProps = (state) => ({
  name: state.NewTrip.name,
  items: state.NewTrip.items,
  activities: state.NewTrip.activities
})

const mapDispatchToProps = (dispatch) => ({
  createTrip: trip => dispatch(receiveTrip(trip)),
  receiveItem: item => dispatch(receiveItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedItemsScreen)
