import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View } from 'react-native'
import { Text, List, ListItem, Button, Icon } from 'react-native-elements'
import { NewTripStep, styles } from './new_trip'
import { receiveTrip } from '../../actions/trip_actions'

const _list = ['1234', '2345', '3456', '4567', 'a1234', 'a2345', 'a3456', 'x4567', '12j34', ]

styles.selected = {
  textDecorationLine: 'none',
  fontStyle: 'normal'
}
styles.unselected = {
  textDecorationLine: 'line-through',
  fontStyle: 'italic',
  color: 'gray'
}

class SuggestedItems extends React.Component {
  constructor(props) {
    super(props)
    const selectedItems = {}
    props.suggestedItems.forEach( el => { selectedItems[el] = true } )
    this.state = { selectedItems }
  }

  makeListItem(item, key) {
    const isSelected = this.state.selectedItems[item]
    return <ListItem
      title={item}
      titleStyle={ isSelected ? styles.selected : styles.unselected }
      hideChevron
      onPress={ () => this.handlePress(item) }
      leftIcon={ isSelected ? {name: 'highlight-off'} : {} }
      key={key}
    />
  }

  handlePress(item) {
    const { selectedItems } = this.state
    const wasSelected = selectedItems[item]
    const newSelected = Object.assign({}, selectedItems, {[item]: !wasSelected})
    this.setState({ selectedItems: newSelected })
  }

  render() {
    const listItems = this.props.suggestedItems.map( (activity, idx) => {
      return this.makeListItem(activity, idx)
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

const SuggestedItemsScreen = ({ navigation }) => {
  const continueButton = (
    <Button
      title={"Continue"}
      onPress={() => navigation.navigate('TripShow')}
    />
  )

  const prompt = (
    <View>
      <Text style={styles.bigText}>
        Here are some suggested items
      </Text>
      <Text style={styles.smallText}>
        You can choose which ones to keep.
      </Text>
    </View>
  )

  const suggestedItems = <SuggestedItems suggestedItems={_list} />

  return <NewTripStep header={prompt} body={suggestedItems} footer={continueButton} />
}

const mapStateToProps = (state) => ({
  suggestedItems: state.items
})

const mapDispatchToProps = (dispatch) => ({
  createTrip: trip => dispatch(receiveTrip(trip))
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedItemsScreen)
