import React from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Text, List, ListItem, Button } from 'react-native-elements'
import { NewTripStep, styles } from './new_trip'
import { getSuggestedItems } from '../../actions/trip_actions'


styles.selected = {
  backgroundColor: 'blue'
}
styles.unselected = {
  backgroundColor: 'white'
}

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

  handleSubmit() {
    const selectedItemsList = Object.keys(this.state.selectedItems)
      .filter(key => this.state.selectedItems[key])
    this.props.getSuggestedItems(selectedItemsList)
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
        <Button title="Test suggestedItems" onPress={ () => this.handleSubmit() } />
      </ScrollView>
    )
  }
}

const AddActivityScreen = (props) => {
  const continueButton = (
    <Button
      title={"Continue"}
      onPress={() => props.navigation.navigate('SuggestedItems')}
    />
  )

  const prompt = (
    <Text style={styles.bigText}>
      What kind of trip?
    </Text>
  )

  const addActivities = <AddActivities/>

  return <NewTripStep header={prompt} body={addActivities} footer={continueButton} />
}

// TODO: fetch these from backend
const mapStateToProps = (state) => ({
  activitiesList: ['Camping', 'Skiing']
})

const mapDispatchToProps = (dispatch) => ({
  getSuggestedItems: selectedActivities => dispatch(getSuggestedItems(selectedActivities))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityScreen)
