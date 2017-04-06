import React from 'react'
import { ScrollView } from 'react-native'
import { Text, List, ListItem, Button } from 'react-native-elements'
import { NewTripStep, styles } from './new_trip'


styles.selected = {
  backgroundColor: 'blue'
}
styles.unselected = {
  backgroundColor: 'white'
}

const _list = ['1234', '2345', '3456', '4567', 'a1234', 'a2345', 'a3456', 'x4567', '12j34', ]

class AddActivities extends React.Component {
  constructor(props) {
    super(props)
    const selectedItems = {}
    props.activitiesList.forEach( el => { selectedItems[el] = false } )
    this.state = { selectedItems }
  }

  makeListItem(item, key) {
    const isSelected = this.state.selectedItems[item]
    return <ListItem
      containerStyle={ [styles.unselected, isSelected && styles.selected] }
      title={item}
      onPress={ () => this.handlePress(item) }
      underlayColor={ 'blue' }
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
    const listItems = this.props.activitiesList.map( (activity, idx) => {
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

export const AddActivityScreen = ({ navigation }) => {
  const continueButton = (
    <Button
      title={"Continue"}
      onPress={() => navigation.navigate('SuggestedItems')}
    />
  )

  const prompt = (
    <Text style={styles.bigText}>
      What kind of trip?
    </Text>
  )

  const addActivities = <AddActivities activitiesList={_list} />

  return <NewTripStep header={prompt} body={addActivities} footer={continueButton} />
}
