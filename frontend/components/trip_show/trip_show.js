import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet } from 'react-native';
import { CheckBox, Icon, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { sendTaggedTripItems,
        updateTripName } from '../../actions/trip_actions';
import { saveTrip } from '../../actions/trip_actions';

// Row and section comparison functions
const rowHasChanged = (r1, r2) => {
  return(r1.checked === r2.checked);
};
const sectionHeaderHasChanged = (s1, s2) => s1 === s2;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged, sectionHeaderHasChanged});

class TripShow extends React.Component {

  constructor(props) {
    super(props);

    this.rows = {};

    Object.keys(this.props.items).forEach( key => {
      if (!this.rows[this.props.items[key].category]) {
        this.rows[this.props.items[key].category] = [];
      }
      this.rows[this.props.items[key].category].push(this.props.items[key]);
    });
    this.state = {
      tripName: this.props.name,
      userChooseTitle: false,
      dataSource: ds.cloneWithRowsAndSections(this.rows),
      itemName: "",
      categoryName: "",
      visible: false,
      activeHeader: ""
    };

    this.addRow = this.addRow.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.archiveTrip = this.archiveTrip.bind(this);
    // this.addTripName = this.addTripName.bind(this);
  }

  renderRow(rowData, sectionId) {
    return (
      <CheckBox containerStyle={styles.row}
        title={rowData.item}
        checked={rowData.checked}
        onPress={() => {
          rowData.checked = !rowData.checked;
          this.setState({dataSource: this.state.dataSource
            .cloneWithRowsAndSections(this.rows)});
        }}
      />
    );
  }

  renderSectionHeader(sectionRows, sectionId) {
    // let condition = (this.state.activeHeader === sectionId && this.state.visible);
    // let condition = (this.state.visible);

    let text1;
    if (this.state.activeHeader === sectionId && this.state.visible) {
      text1 =
      <TextInput
        value={this.state.itemName}
        style={styles.newItemShow}
        placeholder="Type here!"
        onChangeText={(itemName) => {
          this.setState({itemName}, () => console.log(this.state.itemName));
        }}
        onSubmitEditing={() => {
          this.addRow(sectionId);
          this.setState({visible: false, itemName: "", activeHeader: ""});
        }}
      />;
    } else {
      text1 =
      <Text></Text>;
    }
    return (
      <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{sectionId} ({sectionRows.length})</Text>
        <Icon color="white" name='add' onPress={() => {
          this.setState({visible: true, activeHeader: sectionId, dataSource: this.state.dataSource
            .cloneWithRowsAndSections(this.rows)});
        }}/>
      </View>
      {text1}
      </View>
    );
  }

  addRow(sectionId) {
    this.rows[sectionId].push({item: this.state.itemName, checked: false, category: sectionId});
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(this.rows)});
  }

  addHeader() {
    if (!this.rows[this.state.categoryName]) {
      this.rows[this.state.categoryName] = [];
    }
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(this.rows)});
  }

  archiveTrip() {
    let activities = this.props.activities;
    let categories = Object.keys(this.rows);
    let items = [];
    categories.forEach( category => {
      this.rows[category].forEach(item => {
        items.push(item.item);
      });
    });
    this.props.sendTaggedTripItems(items, activities, categories);
    const trip = { id: this.props.id,
       name: this.state.tripName,
       activities: this.props.activities,
       items: this.props.items };
    this.props.saveTrip(trip);
  }

  tripNameRender(){
    if (this.state.userChooseTitle) {
      return(<TextInput
        value={this.state.tripName}
        style={styles.title}
        placeholder= {this.props.name}
        onChangeText={(tripName) => this.setState({tripName})}
        onSubmitEditing={() => {
            styles.textInput={display: "none"};
            this.setState({userChooseTitle: false});
            const trip = { id: this.props.id,
               name: this.state.tripName,
               activities: this.props.activities,
               items: this.props.items };
            this.props.saveTrip(trip);
          }
        }
      />);
    }
    else {

      return (<Button
        textStyle={styles.title}
        color="gray"
        backgroundColor="white"
        fontSize={40}
        fontWeight= "bold"
        title={this.props.name}
        onPress={() => {
          this.setState({userChooseTitle: true});
        }}
        />);

    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.tripNameRender()}

        <Button
          buttonStyle={styles.button}
          icon={{name: 'add'}}
          title='Add Category'
          onPress={() => {
            styles.textInput={display: "flex"};
            this.forceUpdate();
          }}
        />
        <TextInput
          value={this.state.categoryName}
          style={styles.textInput}
          placeholder="Type here!"
          onChangeText={(categoryName) => this.setState({categoryName})}
          onSubmitEditing={() => {
            styles.textInput={display: "none"};
            this.addHeader();
            this.setState({categoryName: ""});
          }}
        />
        <KeyboardAwareScrollView>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSectionHeader={this.renderSectionHeader}
            enableEmptySections={true}
          />
        <Button
          buttonStyle={styles.button}
          icon={{name: 'archive'}}
          title='Archive Trip'
          onPress={() => {
            this.archiveTrip();
            this.props.navigation.navigate('AllTrips');
          }}
        />
    </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.TripShow.name,
  id: state.TripShow.id,
  items: state.TripShow.items,
  activities: state.TripShow.activities
});

const mapDispatchToProps = (dispatch) => ({
  sendTaggedTripItems: (items, activities, categories) => dispatch(sendTaggedTripItems(items, activities, categories)),
  updateTripName: (trip) => dispatch(updateTripName(trip)),
  saveTrip: (trip) => dispatch(saveTrip(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripShow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    padding: 15,
    marginBottom: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
  },
  textInput: {
    display: "none"
  },
  newItemHidden: {
    display: "none"
  },
  newItemShow: {
    display: "flex"
  },
  button: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#3DA57F",
    borderRadius: 50,
  }
});
