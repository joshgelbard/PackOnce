import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text, List, ListItem, Button } from 'react-native-elements'
import {
  receiveNewTripActivity
} from '../../actions/new_trip_actions'

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'blue'
  },
  unselected: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1
  },
  headerContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    height: 70,
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 1
  },
  bigText: {
    fontSize: 24
  },
  smallText: {
    fontSize: 16
  }
})

class AddActivitiesScreen extends React.Component {

  handleSubmit() {
    this.props.navigation.navigate('SuggestedItems')
  }

  makeListItem(activity) {
    return <ListItem
      containerStyle={ [styles.unselected, activity.selected && styles.selected] }
      title={activity.name}
      onPress={ () => this.handleActivityPress(activity) }
      underlayColor={ 'blue' }
      key={activity.id}
    />
  }

  activitiesList() {
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

  handleActivityPress(activity) {
    const newActivity = Object.assign({}, activity, { selected: !activity.selected })
    this.props.receiveNewTripActivity(newActivity)
  }

  continueButton() {
    return <Button title={"Continue"} onPress={() => this.handleSubmit()} />
  }

  prompt() {
    return <Text style={styles.bigText}>
      What kind of trip?
    </Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          { this.prompt() }
        </View>
        <View style={styles.bodyContainer}>
          { this.activitiesList() }
        </View>
        <View style={styles.footerContainer}>
          { this.continueButton() }
        </View>
      </View>
    )
  }
}

// TODO: fetch these from backend
const mapStateToProps = (state) => ({
  name: state.NewTrip.name,
  activities: state.NewTrip.activities
})

const mapDispatchToProps = (dispatch) => ({
  receiveNewTripActivity: activity => dispatch(receiveNewTripActivity(activity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddActivitiesScreen)
