import React from 'react';
import { AppRegistry, ListView, View, Text, TextInput,
  StyleSheet } from 'react-native';
import { CheckBox, Icon, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { sendTaggedTripItems } from '../../actions/trip_actions';

// const backendData = {
//   0: {id: 0, name: 'Toothbrush', checked: true, category: 'Toiletries'},
//   1: {id: 1, name: 'Shampoo', checked: true, category: 'Toiletries'},
//   3: {id: 2, name: 'Shaving Cream', checked: true, category: 'Toiletries'},
//   4: {id: 3, name: 'Tablet', checked: true, category: 'Electronics'},
//   5: {id: 4, name: 'Cell Phone', checked: true, category: 'Electronics'},
// };
//
// var rows = {};
// Object.keys(backendData).forEach( key => {
//   if (!rows[backendData[key].category]) {
//     rows[backendData[key].category] = [];
//   }
//   rows[backendData[key].category].push(backendData[key]);
// });

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
      dataSource: ds.cloneWithRowsAndSections(this.rows),
      itemName: "",
      visible: false,
      activeHeader: ""
    };

    this.addRow = this.addRow.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.archiveTrip = this.archiveTrip.bind(this);
  }

  renderRow(rowData, sectionId) {
    return (
      <CheckBox containerStyle={styles.row}
        title={rowData.name}
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
    let condition = (this.state.visible);

    return (
      <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{sectionId} ({sectionRows.length})</Text>
        <Icon color="white" name='add' onPress={() => {
          this.setState({visible: true, activeHeader: sectionId, dataSource: this.state.dataSource
            .cloneWithRowsAndSections(this.rows)});
        }}/>
      </View>
      <TextInput
        value={this.state.itemName}
        style={[styles.newItemHidden, condition && styles.newItemShow]}
        placeholder="Type here!"
        onChangeText={(itemName) => this.setState({itemName})}
        onSubmitEditing={() => {
          this.setState({visible: false, itemName: "", activeHeader: ""});
          this.addRow(sectionId);
        }}
      />
      </View>
    );
  }

  addRow(sectionId) {
    this.rows[sectionId].push({name: this.state.itemName, checked: false, category: sectionId});
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(this.rows)});
  }

  addHeader() {
    if (!this.rows[this.state.itemName]) {
      this.rows[this.state.itemName] = [];
    }
    this.setState({dataSource: this.state.dataSource
      .cloneWithRowsAndSections(this.rows)});
  }

  archiveTrip() {
    let activities = this.props.activities;
    let categories = Object.keys(this.rows);
    let items = [];
    Object.keys(this.rows).forEach( key => {
      items.push(this.rows[key].name);
    });
    this.props.sendTaggedTripItems(items, activities, categories);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.name}</Text>
        <CheckBox containerStyle={styles.row}
          onPress={() => {
            styles.textInput={display: "flex"};
            this.forceUpdate();
          }}
          center
          title='Add Category'
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          checkedColor='red'
          checked={false}
        />
        <TextInput
          value={this.state.itemName}
          style={styles.textInput}
          placeholder="Type here!"
          onChangeText={(itemName) => this.setState({itemName})}
          onSubmitEditing={() => {
            styles.textInput={display: "none"};
            this.addHeader();
            this.setState({itemName: ""});
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
            this.props.navigation.navigate('HomeView');
          }}
        />
    </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.TripShow.name,
  items: state.TripShow.items,
  activities: state.TripShow.activities
});

const mapDispatchToProps = (dispatch) => ({
  sendTaggedTripItems: (items, activities, categories) => dispatch(sendTaggedTripItems(items, activities, categories))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripShow);


const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 40,
    padding: 15,
    marginBottom: 5,
    fontWeight: 'bold',
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
    marginBottom: 10,
    backgroundColor: "green"
  }
});
