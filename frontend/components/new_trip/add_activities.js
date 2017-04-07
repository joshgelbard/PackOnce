import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, List, ListItem, Button } from 'react-native-elements'
import { NewTripStep, newTripStyles } from './new_trip'
import { getSuggestedItems, receiveActivity } from '../../actions/trip_actions'

const addActivitiesStyles = StyleSheet.create({
  selected: {
    backgroundColor: 'blue'
  },
  unselected: {
    backgroundColor: 'white'
  }
})

class AddActivities extends React.Component {
  constructor(props) {
    super(props)
  }

  makeListItem(activity) {
    return <ListItem
      containerStyle={ [addActivitiesStyles.unselected, activity.selected && addActivitiesStyles.selected] }
      title={activity.name}
      onPress={ () => this.handlePress(activity) }
      underlayColor={ 'blue' }
      key={activity.id}
    />
  }

  handlePress(activity) {
    const newActivity = Object.assign({}, activity, { selected: !activity.selected })
    this.props.receiveActivity(newActivity)
  }

  render() {
    const listItems = Object.keys(this.props.activities).map( (id) => {
      return this.makeListItem(this.props.activities[id])
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

class AddActivityScreen extends React.Component {

  handleSubmit() {
    const selectedActivities = []
    Object.keys(this.props.activities).forEach( key => {
      if (this.props.activities[key].selected) {
        selectedActivities.push(this.props.activities[key].name)
      }
    })
    this.props.getSuggestedItems(selectedActivities)
      .then( () => this.props.navigation.navigate('SuggestedItems'))
      .catch( () => this.props.navigation.navigate('SuggestedItems'))
  }

  render() {
    const {activities, receiveActivity } = this.props

    const continueButton = (
      <Button title={"Continue"} onPress={() => this.handleSubmit()} />
    )

    const prompt = (
      <Text style={newTripStyles.bigText}>
        What kind of trip?
      </Text>
    )

    const addActivities = <AddActivities activities={activities} receiveActivity={receiveActivity}/>

    return <NewTripStep header={prompt} body={addActivities} footer={continueButton} />
  }
}

// TODO: fetch these from backend
const mapStateToProps = (state) => ({
  name: state.NewTrip.name,
  activities: state.NewTrip.activities
})

const mapDispatchToProps = (dispatch) => ({
  receiveActivity: activity => dispatch(receiveActivity(activity)),
  getSuggestedItems: selectedActivities => dispatch(getSuggestedItems(selectedActivities))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityScreen)
