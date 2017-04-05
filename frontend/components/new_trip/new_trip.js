import React from 'react';
import { View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { Text, List, ListItem, Button } from 'react-native-elements';
import { SearchBar } from 'react-native-elements'

const list = ['1234', '2345', '3456', '4567', '1234', '2345', '3456', '4567', '1234', '2345', '3456', '4567', '1234', '2345', '3456', '4567', '1234', '2345', '3456']

const addActivityStyles = StyleSheet.create({
  unselected: {
    backgroundColor: 'white'
  },
  selected: {
    backgroundColor: 'blue'
  },
  container: {
    flex: 1
  },
  promptContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  prompt: {
    fontSize: 24
  },
  footer: {
    height: 70,
    justifyContent: 'center'
  }
});

class ActivitySelector extends React.Component {
  constructor() {
    super()
    this.state = { selected: false }
  }

  render() {
    const { title } = this.props
    const { selected } = this.state
    const styles = addActivityStyles
    return (
        <ListItem
          containerStyle={ [styles.unselected, selected && styles.selected] }
          title={title}
          onPress={ () =>
            this.setState({ selected: !selected})
          }
          underlayColor={ 'blue' }/>
    )
  }
}

export class AddActivity extends React.Component {
  render() {
    const styles = addActivityStyles
    return (
      <View style={styles.container}>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>
            What kind of trip?
          </Text>
        </View>
        <ScrollView>
          <List>
            {
              list.map((l, i) => (
                <ActivitySelector key={i} title={l} />
              ))
            }
          </List>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            onPress={ () => this.props.navigation.navigate('AddDestination')}
            title={'continue'}
          />
        </View>
      </View>
    );
  }
}

const addDestinationStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 6
  },
  footer: {
    height: 30
  },
  prompt: {
    fontSize: 24
  }
})

export class AddDestination extends React.Component {
  constructor() {
    super()
    this.state = { text: '' }
  }

  render() {
    const styles = addDestinationStyles
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.prompt}>
            Where will you go?
          </Text>
          <SearchBar
            noIcon
            lightTheme
            placeholder='Add Destination'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
        </View>
        <View style={styles.footer}>
          <Button
            onPress={ () => this.props.navigation.navigate('SuggestedItems')}
            title={'continue'}/>
        </View>
      </View>
    );
  }
}

const suggestedItemsStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  prompt: {
    flex: 1
  },
  bigText: {
    fontSize: 24
  },
  smallText: {
    fontSize: 16
  },
  list: {
    flex: 13
  },
  footer: {
    height: 30
  }
})

export class SuggestedItems extends React.Component {
  render() {
    const styles = suggestedItemsStyles
    return (
      <View style={styles.container}>
        <View style={styles.prompt}>
          <Text style={styles.bigText}>
            Here are some suggested items
          </Text>
          <Text style={styles.smallText}>
            You can choose which ones to keep.
          </Text>
        </View>
        <View style={styles.list}>
          <ScrollView>
            <List>
              {
                list.map((l, i) => (
                  <ListItem
                    key={i}
                    title={l}
                    onPress={() => null}
                  />
                ))
              }
            </List>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button
            onPress={ () => this.props.navigation.navigate('TripShow')}
            title={'continue'}
          />
        </View>
      </View>
    );
  }
}
